import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { Link } from "./link";

export type BreadcrumbItem = {
  name: string;
  href: string;
  current?: boolean;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  homeLabel?: string;
  className?: string;
}

export const FolderBreadcrumb: FC<BreadcrumbProps> = ({
  items,
  homeHref = "/",
  homeLabel = "Home",
  className = "",
}) => (
  <nav
    aria-label="Breadcrumb"
    className={`flex overflow-x-auto whitespace-nowrap px-4 sm:px-0 ${className}`}
  >
    <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
      <li className="flex-shrink-0">
        <Link
          href={homeHref}
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <HomeIcon
            aria-hidden="true"
            className="h-4 w-4 sm:h-5 sm:w-5 shrink-0"
          />
          <span className="sr-only">{homeLabel}</span>
        </Link>
      </li>
      {items.map((item) => (
        <li key={item.href} className="flex-shrink-0">
          <div className="flex items-center">
            <ChevronRightIcon
              aria-hidden="true"
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-400 dark:text-gray-500"
            />
            <Link
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={`ml-2 sm:ml-4 text-xs sm:text-sm font-medium truncate ${
                item.current
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);
