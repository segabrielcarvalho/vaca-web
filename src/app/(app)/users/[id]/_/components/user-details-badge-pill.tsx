export const UserDetailsBadgePill = ({
  icon: Icon,
  label,
  tone = "neutral",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "neutral" | "success" | "danger";
}) => {
  const tones =
    tone === "success"
      ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20"
      : tone === "danger"
      ? "bg-rose-500/10 text-rose-300 ring-rose-500/20"
      : "bg-zinc-700/40 text-zinc-200 ring-white/10";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ${tones}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};
