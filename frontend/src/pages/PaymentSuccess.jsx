import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="card max-w-md p-10 text-center shadow-xl">
        <CheckCircle size={64} className="mx-auto text-emerald-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-gray-500">
          Transaction: <span className="font-mono">{params.get("tran_id") || "N/A"}</span>
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/payments" className="btn-primary">View Payments</Link>
          <Link to="/" className="btn-secondary">Home</Link>
        </div>
      </div>
    </div>
  );
}