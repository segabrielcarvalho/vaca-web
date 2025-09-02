export const UserDetailsRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="flex flex-row flex-1  items-start gap-1 border-b border-white/5 py-4 last:border-none xl:grid-cols-2 xl:gap-4">
      <div className="flex items-center gap-2 text-[12px] text-zinc-400">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span className="truncate ">{label}</span>
      </div>
      <div className="text-[13px] w-full flex flex-1 md:justify-end text-zinc-200 xl:text-right">
        {value}
      </div>
    </div>
  );
};
