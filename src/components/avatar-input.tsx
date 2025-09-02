"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import {
  ChangeEvent,
  forwardRef,
  RefObject,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { humanFileSize } from "../lib/humanFileSize";
import { Button } from "./button";

type CommonProps = {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  maxSize?: number;
  avatarSrc?: string;
  disabled?: boolean;
  className?: string;
  avatarClassName?: string;
};

type AvatarInputFileProps = CommonProps & {
  returnAs?: "file";
  onChange?: (value: File | null) => void;
};

type AvatarInputBase64Props = CommonProps & {
  returnAs: "base64";
  onChange?: (value: string | null) => void;
};

type AvatarInputProps = AvatarInputFileProps | AvatarInputBase64Props;

export const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  function AvatarInput(
    {
      label = "Profile photo",
      id,
      name = "avatar",
      accept = "image/*",
      maxSize = 1024 * 1024,
      avatarSrc,
      disabled,
      className,
      returnAs = "file",
      onChange,
      avatarClassName,
    },
    ref
  ) {
    const generatedId = useId();

    const inputId = id ?? generatedId;

    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    const objectUrlRef = useRef<string | null>(null);

    const [preview, setPreview] = useState<string | null>(avatarSrc ?? null);

    const [error, setError] = useState<string | null>(null);

    const sizeText = useMemo(() => humanFileSize(maxSize), [maxSize]);

    useEffect(() => {
      setPreview(avatarSrc ?? null);
    }, [avatarSrc]);

    useEffect(() => {
      return () => {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      };
    }, []);

    const handleSelectClick = () => {
      if (!disabled) hiddenInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      if (file && file.size > maxSize) {
        setError(`Imagem muito grande. Máximo ${sizeText}.`);
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
        e.target.value = "";
        onChange?.(null);
        return;
      }

      setError(null);

      if (!file) {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
        setPreview(null);
        onChange?.(null);
        return;
      }

      if (returnAs === "base64") {
        const reader = new FileReader();
        reader.onload = () => {
          const result =
            typeof reader.result === "string" ? reader.result : null;
          setPreview(result);
          (onChange as AvatarInputBase64Props["onChange"])?.(result);
        };
        reader.readAsDataURL(file);
      } else {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        setPreview(url);
        (onChange as AvatarInputFileProps["onChange"])?.(file);
      }
    };

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className="block text-sm/6 font-medium text-gray-900 dark:text-zinc-200"
        >
          {label}
        </label>

        <div className="mt-2 flex items-center gap-x-3 w-full justify-start flex-col sm:flex-row">
          {preview ? (
            <Image
              src={preview}
              alt=""
              width={200}
              height={200}
              className={clsx(avatarClassName)}
            />
          ) : (
            <UserCircleIcon
              aria-hidden="true"
              className={clsx(avatarClassName)}
            />
          )}

          <div className="flex flex-col items-start justify-center gap-1 text-sm/6 text-gray-700 dark:text-zinc-300 w-full">
            <Button
              type="button"
              onClick={handleSelectClick}
              disabled={disabled}
              outline
            >
              Mudar Avatar
            </Button>
            <p className="mt-2 text-xs/5 text-gray-400">
              JPG, GIF ou PNG. {sizeText}
            </p>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <input
          ref={(el) => {
            hiddenInputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as RefObject<HTMLInputElement | null>).current = el;
          }}
          id={inputId}
          type="file"
          name={name}
          className="hidden"
          accept={accept}
          disabled={disabled}
          onChange={handleFileChange}
        />
      </div>
    );
  }
);
