import clsx from "clsx";

export function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      role="presentation"
      {...props}
      className={clsx(
        className,
        "w-full border-t",
        soft && "border-zinc-200",
        !soft && "border-zinc-500 border-e-20 lg:border-e-0"
      )}
    />
  );
}
