"use client";

import useToastHook from "@/hooks/useToastHook";
import { handleMutationError } from "@/lib/handleMutationError";
import { useMutation, useSubscription, useSuspenseQuery } from "@apollo/client";
import {
  CorrectionStatusDocument,
  type CorrectionStatusSubscription,
  type CorrectionStatusSubscriptionVariables,
  GetExamDocument,
  type GetExamQuery,
  type GetExamQueryVariables,
  StartCorrectionDocument,
  type StartCorrectionMutation,
  type StartCorrectionMutationVariables,
  SubmitCorrectionPhotoDocument,
  type SubmitCorrectionPhotoMutation,
  type SubmitCorrectionPhotoMutationVariables,
} from "@generated/hooks";
import { Camera } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CorrectionScreenProps = {
  examId: string;
  params: {
    schoolId: string;
    courseId: string;
    klassId: string;
    examId: string;
  };
};

export function CorrectionScreen({ examId, params }: CorrectionScreenProps) {
  const { data } = useSuspenseQuery<GetExamQuery, GetExamQueryVariables>(
    GetExamDocument,
    {
      variables: { id: examId },
      fetchPolicy: "network-only",
    }
  );
  const exam = data.getExam;
  const { error } = useToastHook();

  const [startCorrection, { loading: starting }] = useMutation<
    StartCorrectionMutation,
    StartCorrectionMutationVariables
  >(StartCorrectionDocument);
  const [submitPhoto, { loading: sending }] = useMutation<
    SubmitCorrectionPhotoMutation,
    SubmitCorrectionPhotoMutationVariables
  >(SubmitCorrectionPhotoDocument);

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
    const setup = async () => {
      await ensureSession();
      await requestCamera(selectedDeviceId ?? undefined);
    };
    void setup();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  useSubscription<
    CorrectionStatusSubscription,
    CorrectionStatusSubscriptionVariables
  >(CorrectionStatusDocument, {
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

  const requestCamera = async (deviceId?: string) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Navegador não suporta câmera.");
      return;
    }
    try {
      stopStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: deviceId
          ? { deviceId: { exact: deviceId } }
          : { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraError(null);

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      setCameras(videoInputs);
      if (!deviceId && videoInputs.length > 0) {
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

  const backHref = `/schools/${params.schoolId}/courses/${params.courseId}/classes/${params.klassId}/exams/${params.examId}/correcoes`;

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full bg-black object-contain"
        playsInline
        muted
        autoPlay
        onClick={() => void handleCaptureAndSend()}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent px-4 pb-6 pt-4 text-white">
        <div className="pointer-events-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-end" />

          <div className="flex flex-wrap items-center gap-3 mt-13">
            {cameras.length > 0 && (
              <label className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs">
                <span className="font-semibold text-white/80">Câmera</span>
                <select
                  value={selectedDeviceId ?? ""}
                  onChange={(e) => {
                    const newId = e.target.value || null;
                    setSelectedDeviceId(newId);
                    void requestCamera(newId ?? undefined);
                  }}
                  className="rounded-md border border-white/20 bg-white/20 px-2 py-1 text-xs text-white focus:border-yellow-300 focus:outline-none"
                  disabled={busy}
                >
                  {cameras.map((cam) => (
                    <option key={cam.deviceId} value={cam.deviceId}>
                      {cam.label || "Câmera"}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <Link
              href={backHref}
              className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/30"
            >
              Finalizar
            </Link>
          </div>
        </div>
      </div>

      {showCheck && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/60 text-4xl font-bold text-green-600 shadow-lg backdrop-blur-sm">
            ✓
          </div>
        </div>
      )}

      {cameraError && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 w-[90%] -translate-x-1/2 text-center text-xs text-rose-300">
          {cameraError}
        </div>
      )}

      <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] pt-10">
        <button
          type="button"
          onClick={() => void handleCaptureAndSend()}
          disabled={busy || !!cameraError}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-xl backdrop-blur transition hover:bg-white disabled:opacity-60"
        >
          <Camera className="h-8 w-8" />
        </button>
        <p className="text-xs text-white/80">Toque para capturar e enviar</p>
      </div>
    </div>
  );
}
