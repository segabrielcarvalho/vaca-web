type SummaryCardProps = {
  title: string;
  value: string;
  helper?: string;
  trendLabel?: string;
  trendTone?: "up" | "down";
};

export function SummaryCard({
  title,
  value,
  helper,
  trendLabel,
  trendTone = "up",
}: SummaryCardProps) {
  const trendColor =
    trendTone === "up"
      ? "text-emerald-700 bg-emerald-50"
      : "text-rose-700 bg-rose-50";

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        {trendLabel && (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${trendColor}`}
          >
            {trendLabel}
          </span>
        )}
        {helper && <span className="text-zinc-500">{helper}</span>}
      </div>
    </div>
  );
}
