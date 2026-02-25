import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="card max-w-md p-10 text-center shadow-xl">
        <AlertCircle size={64} className="mx-auto text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="mt-2 text-gray-500">You cancelled the payment.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/my-rent-requests" className="btn-primary">Back to Requests</Link>
          <Link to="/" className="btn-secondary">Home</Link>
        </div>
      </div>
    </div>
  );
}