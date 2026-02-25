import { Home, Users, Star, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Home, value: "2,500+", label: "Properties Listed" },
  { icon: Users, value: "8,000+", label: "Happy Tenants" },
  { icon: Star, value: "4.8★", label: "Average Rating" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

const StatsSection = () => {
  return (
    <>
      <section className="bg-primary-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon size={32} className="mx-auto text-primary-200" />
                <p className="mt-3 text-3xl font-extrabold text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-primary-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
