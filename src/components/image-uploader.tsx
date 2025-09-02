"use client";

import { useFilePreview } from "@/hooks/useFilePreview";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { useId } from "react";

interface ImageUploaderProps {
  file: File | null;
  onChange(file: File | null): void;
  initialUrl?: string;
}

export function ImageUploader({
  file,
  onChange,
  initialUrl,
}: ImageUploaderProps) {
  const reactId = useId();

  const previewFromFile = useFilePreview(file);

  const previewSrc = previewFromFile ?? initialUrl ?? null;

  const dropZone = clsx(
    "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg",
    "border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800",
    "hover:border-gray-400 dark:hover:border-zinc-500 transition-colors cursor-pointer"
  );

  const handleFile = (f: File | null) => onChange(f);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={clsx(
          "block font-medium text-zinc-950 dark:text-zinc-200 text-sm leading-6 select-none"
        )}
      >
        Arquivo
      </label>
      <div
        className={dropZone}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0] ?? null);
        }}
      >
        <label
          htmlFor={`file-input-${reactId}`}
          className="w-full flex flex-col items-center"
        >
          <input
            id={`file-input-${reactId}`}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <CloudArrowUpIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Arraste o arquivo aqui ou clique para escolher
          </p>
        </label>
        {previewSrc && (
          <>
            <Image
              src={previewSrc}
              alt="Preview"
              width={600}
              height={100}
              className="mt-4 rounded-md object-contain max-h-48"
              unoptimized
            />
            {file && (
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate max-w-[50ch]">
                {file.name}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
