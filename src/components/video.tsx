interface VideoProps {
  videoUrl: string;
  title?: string;
  description?: string;
  className?: string;
}

export function Video({
  videoUrl,
  title,
  description,
  className = "",
}: VideoProps) {
  return (
    <section className={`mt-10 ${className}`}>
      <div className="w-full max-w-6xl">
        <div className="rounded-2xl overflow-hidden">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="w-full">
              <div className="relative w-full aspect-video">
                <iframe
                  src={videoUrl}
                  title={title || "Video"}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {(title || description) && (
              <div className="md:px-6">
                {title && (
                  <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-pretty text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video;
