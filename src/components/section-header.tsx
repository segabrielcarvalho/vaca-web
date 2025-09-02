import type { ReactNode } from "react";
import { Divider } from "./divider";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode[];
}

export default function SectionHeader({
  title,
  description,
  actions = [],
}: SectionHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between w-full mb-8">
        <div className="flex-shrink-0 mr-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-zinc-100">
            {title}
          </h2>
          {description && (
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {actions.map((action, idx) => (
              <div key={idx} className="flex items-center">
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider className="mb-6" />
    </div>
  );
}
