import React from "react";

interface SectionInformationProps {
  title: string;
  description: string;
  className?: string;
}

export const SectionInformation: React.FC<SectionInformationProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={className}>
      <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
