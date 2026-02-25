import { Link, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentFail() {
  const [params] = useSearchParams();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="card max-w-md p-10 text-center shadow-xl">
        <XCircle size={64} className="mx-auto text-red-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Failed</h1>
        <p className="mt-2 text-gray-500">
          {params.get("error") || "Something went wrong. Please try again."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/my-rent-requests" className="btn-primary">Try Again</Link>
          <Link to="/" className="btn-secondary">Home</Link>
        </div>
      </div>
    </div>
  );
}