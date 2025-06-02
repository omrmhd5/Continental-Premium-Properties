import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ErrorPopup({
  isOpen,
  onClose,
  title,
  description,
  action,
  isTokenError = false,
}) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen && isTokenError) {
      // If it's a token error, redirect to login after 3 seconds
      const timer = setTimeout(() => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isTokenError, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700"
        style={{
          animation: "popup 0.3s ease-out",
        }}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

        {action && <div className="flex justify-end">{action}</div>}
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
