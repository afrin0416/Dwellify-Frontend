import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = 40, className = "" }) => {
  return (
    <>
      <div className={`flex items-center justify-center py-20 ${className}`}>
        <Loader2 size={size} className="animate-spin text-primary-600" />
      </div>
    </>
  );
};

export default LoadingSpinner;
