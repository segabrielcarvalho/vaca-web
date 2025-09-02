import clsx from "clsx";

export const BgP = ({
  floodColor = "#efb100",
  opacity = 1,
}: {
  floodColor?: string;
  opacity?: number;
}) => {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        "absolute inset-0 md:-mt-[2.5rem] -z-9 w-full h-full stroke-zinc-700 [mask-image:radial-gradient(100%_100%_at_top_right,black,transparent)]",
        `opacity-${opacity}`
      )}
    >
      <defs>
        <pattern
          x="50%"
          y={-1}
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg
        x="50%"
        y={-1}
        className="overflow-visible fill-brand-900 opacity-15"
        filter="url(#glow)"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="5"
              floodColor={floodColor}
            />
          </filter>
        </defs>
        <title>Bg</title>
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>

      <rect
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
    </svg>
  );
};
