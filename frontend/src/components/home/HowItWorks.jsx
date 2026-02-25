import { UserPlus, Search, Send, KeyRound } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    desc: "Register and verify your email to get started.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Search,
    title: "Find a Property",
    desc: "Browse and filter hundreds of rental listings.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Send,
    title: "Send Request",
    desc: "Send a rent request to the property owner.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: KeyRound,
    title: "Move In",
    desc: "Pay securely online and get your new home keys!",
    color: "bg-purple-100 text-purple-600",
  },
];

const HowItWorks = () => {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Rent your dream home in 4 simple steps
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 hidden w-full border-t-2 border-dashed border-gray-200 lg:block" />
              )}
              <div
                className={`relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl ${s.color}`}
              >
                <s.icon size={32} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
