"use client";

import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import {
  gql,
  useMutation,
  useSubscription,
  useSuspenseQuery,
} from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Camera } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

type PageProps = {
  params: Promise<{
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  }>;
};

type GetExamQuery = { getExam: { id: string; title: string } };
type GetExamVariables = { id: string };

const GET_EXAM_QUERY: TypedDocumentNode<GetExamQuery, GetExamVariables> = gql`
  query GetExamForCorrection($id: String!) {
    getExam(id: $id) {
      id
      title
    }
  }
`;

type StartCorrectionData = {
  startCorrection: { sessionId: string; examId: string };
};

type SubmitCorrectionData = {
  submitCorrectionPhoto: {
    sessionId: string;
    examId: string;
    jobId?: string | null;
  };
};

type SubmitCorrectionVariables = {
  data: {
    sessionId: string;
    examId: string;
    fileBase64: string;
    threshold?: number | null;
    delta?: number | null;
  };
};

type CorrectionStatusPayload = {
  sessionId: string;
  examId: string;
  status: "QUEUED" | "PROCESSING" | "PHOTO_OK" | "GRADED" | "ERROR";
};

type CorrectionStatusEvent = { correctionStatus: CorrectionStatusPayload };

const START_CORRECTION_MUTATION: TypedDocumentNode<
  StartCorrectionData,
  { examId: string }
> = gql`
  mutation StartCorrection($examId: String!) {
    startCorrection(examId: $examId) {
      sessionId
      examId
    }
  }
`;

const SUBMIT_CORRECTION_MUTATION: TypedDocumentNode<
  SubmitCorrectionData,
  SubmitCorrectionVariables
> = gql`
  mutation SubmitCorrectionPhoto($data: SubmitCorrectionInput!) {
    submitCorrectionPhoto(data: $data) {
      sessionId
      examId
      jobId
    }
  }
`;

const CORRECTION_STATUS_SUBSCRIPTION: TypedDocumentNode<
  CorrectionStatusEvent,
  { sessionId: string }
> = gql`
  subscription CorrectionStatus($sessionId: String!) {
    correctionStatus(sessionId: $sessionId) {
      sessionId
      examId
      status
    }
  }
`;

export default function CorrectionPage({ params }: PageProps) {
  const { examId } = use(params);
  return <CorrectionClient examId={examId} params={use(params)} />;
}

function CorrectionClient({
  examId,
  params,
}: {
  examId: string;
  params: {
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  };
}) {
  const { data } = useSuspenseQuery(GET_EXAM_QUERY, {
    variables: { id: examId },
    fetchPolicy: "network-only",
  });
  const exam = data.getExam;
  const { error } = useToastHook();

  const [startCorrection, { loading: starting }] = useMutation(
    START_CORRECTION_MUTATION
  );
  const [submitPhoto, { loading: sending }] = useMutation(
    SUBMIT_CORRECTION_MUTATION
  );

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const busy = starting || sending || isCapturing;

  useEffect(() => {
    void ensureSession();
    void requestCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    void requestCamera();
  }, [selectedDeviceId, sessionId]);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  useSubscription(CORRECTION_STATUS_SUBSCRIPTION, {
    variables: { sessionId: sessionId ?? "" },
    skip: !sessionId,
    onData: ({ data }) => {
      const payload = data.data?.correctionStatus;
      if (!payload) return;
      if (payload.status === "GRADED" || payload.status === "PHOTO_OK") {
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1000);
      }
      if (payload.status === "ERROR") {
        error({ message: "Erro na correção." });
      }
    },
  });

  const createSession = async () => {
    const { data } = await startCorrection({ variables: { examId } });
    const newSession = data?.startCorrection.sessionId;
    if (!newSession) throw new Error("Não foi possível iniciar a sessão.");
    setSessionId(newSession);
    return newSession;
  };

  const ensureSession = async () => sessionId ?? (await createSession());

  const requestCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Navegador não suporta câmera.");
      return;
    }
    try {
      stopStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: selectedDeviceId
          ? { deviceId: { exact: selectedDeviceId } }
          : { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraError(null);

      // Atualiza lista de câmeras após permissão
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      setCameras(videoInputs);
      if (!selectedDeviceId && videoInputs.length > 0) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível acessar a câmera.";
      setCameraError(message);
      error({ message });
    }
  };

  const captureFrame = (): string | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const handleCaptureAndSend = async () => {
    setIsCapturing(true);
    try {
      const base64 = captureFrame();
      if (!base64) throw new Error("Não foi possível capturar a imagem.");
      const activeSession = await ensureSession();
      await submitPhoto({
        variables: {
          data: {
            sessionId: activeSession,
            examId,
            fileBase64: base64,
          },
        },
      });
    } catch (err) {
      handleMutationError({ error: err }, (message) => error({ message }));
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {cameras.length > 0 && (
        <div className="absolute left-4 top-20 z-10 rounded-full bg-white/80 px-3 py-2 text-xs text-zinc-800 shadow-md backdrop-blur">
          <label className="mr-2 font-semibold text-zinc-700">Câmera:</label>
          <select
            value={selectedDeviceId ?? ""}
            onChange={(e) => setSelectedDeviceId(e.target.value || null)}
            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-800 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            disabled={busy}
          >
            {cameras.map((cam) => (
              <option key={cam.deviceId} value={cam.deviceId}>
                {cam.label || "Câmera"}
              </option>
            ))}
          </select>
        </div>
      )}
      <Link
        href={`/schools/${params.schoolId}/courses/${params.courseId}/classes/${params.klassId}/exams/${params.examId}/correcoes`}
        className="absolute right-4 top-20 z-10 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-800 shadow-md backdrop-blur transition hover:bg-white"
      >
        Finalizar
      </Link>
      <video
        ref={videoRef}
        className="h-full w-full object-contain bg-black"
        playsInline
        muted
        autoPlay
        onClick={() => void handleCaptureAndSend()}
      />
      {showCheck && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-white/60 text-green-600 shadow-lg backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
            ✓
          </div>
        </div>
      )}
      {cameraError && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 text-center text-xs text-rose-400">
          {cameraError}
        </div>
      )}
      <button
        type="button"
        onClick={() => void handleCaptureAndSend()}
        disabled={busy || !!cameraError}
        className="absolute bottom-30 right-1/2 translate-x-1/2 rounded-full bg-white/80 p-4 text-zinc-800 shadow-xl backdrop-blur transition hover:bg-white disabled:opacity-60"
      >
        <Camera className="h-8 w-8" />
      </button>
    </div>
  );
}
