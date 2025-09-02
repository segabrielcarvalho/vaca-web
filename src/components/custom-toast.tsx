import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface CustomToastProps {
  message: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const iconMap = {
  success: <CheckBadgeIcon className="h-6 w-6 text-green-400" />,
  error: <ExclamationCircleIcon className="h-6 w-6 text-red-400" />,
  info: <CheckBadgeIcon className="h-6 w-6 text-brand-400" />,
  warning: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />,
};

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  description,
  type,
  onClose,
}) => {
  return (
    <div className="z-50 pointer-events-auto flex-1 max-w-2xl overflow-hidden rounded-lg">
      <div className="p-1">
        <div className="flex items-center">
          <div className="flex-shrink-0">{iconMap[type]}</div>

          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-zinc-100 ">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-zinc-200 ">{description}</p>
            )}
          </div>

          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md text-zinc-100 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 "
            >
              <span className="sr-only">Fechar</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
