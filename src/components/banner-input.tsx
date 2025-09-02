"use client";

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
import { FaRegImage } from "react-icons/fa";
import { humanFileSize } from "../lib/humanFileSize";
import { Button } from "./button";

type CommonProps = {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  maxSize?: number;
  bannerSrc?: string;
  disabled?: boolean;
  className?: string;
  bannerClassName?: string;
};

type BannerInputFileProps = CommonProps & {
  returnAs?: "file";
  onChange?: (value: File | null) => void;
};

type BannerInputBase64Props = CommonProps & {
  returnAs: "base64";
  onChange?: (value: string | null) => void;
};

type BannerInputProps = BannerInputFileProps | BannerInputBase64Props;

export const BannerInput = forwardRef<HTMLInputElement, BannerInputProps>(
  function BannerInput(
    {
      label = "Banner",
      id,
      name = "banner",
      accept = "image/*",
      maxSize,
      bannerSrc,
      disabled,
      className,
      returnAs = "file",
      onChange,
      bannerClassName,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);
    const [preview, setPreview] = useState<string | null>(bannerSrc ?? null);

    const sizeText = useMemo(
      () => (maxSize ? humanFileSize(maxSize) : "1 MB"),
      [maxSize]
    );

    useEffect(() => {
      setPreview(bannerSrc ?? null);
    }, [bannerSrc]);

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
      if (file && maxSize && file.size > maxSize) {
        e.target.value = "";
        onChange?.(null);
        return;
      }
      if (!file) {
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
          (onChange as BannerInputBase64Props["onChange"])?.(result);
        };
        reader.readAsDataURL(file);
      } else {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        setPreview(url);
        (onChange as BannerInputFileProps["onChange"])?.(file);
      }
    };

    return (
      <div className={clsx("flex flex-col gap-3", className)}>
        <label
          htmlFor={inputId}
          className="block text-sm/6 font-medium text-gray-900 dark:text-zinc-200"
        >
          {label}
        </label>

        <div className="flex flex-col gap-1 text-sm/6 text-gray-700 dark:text-zinc-300 w-full">
          <Button
            type="button"
            onClick={handleSelectClick}
            disabled={disabled}
            outline
          >
            Mudar Banner
          </Button>
          <p className="text-xs/5 text-gray-400">JPG, GIF ou PNG. {sizeText}</p>
        </div>

        {preview ? (
          <div
            className={clsx(
              "w-full overflow-hidden rounded-md flex-1 h-full",
              bannerClassName
            )}
          >
            <Image
              src={preview}
              alt=""
              width={1200}
              height={0}
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div
            className={clsx(
              "w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-800 flex items-center justify-center h-56",
              bannerClassName
            )}
          >
            <FaRegImage
              aria-hidden="true"
              className="h-16 w-16 text-gray-400"
            />
          </div>
        )}

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
          {...rest}
        />
      </div>
    );
  }
);
