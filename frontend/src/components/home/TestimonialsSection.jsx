import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Tenant",
    text: "Found my dream apartment in just 2 days! The process was incredibly smooth and the owner was very responsive.",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Property Owner",
    text: "I listed my flat and got 10 rent requests within a week. The payment system is very convenient and secure.",
    rating: 5,
  },
  {
    name: "Arif Hossain",
    role: "Tenant",
    text: "Best rental platform in Bangladesh. The filters helped me find exactly what I needed within my budget.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Trusted by thousands across the country
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      fill={j < t.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  "{t.text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default TestimonialsSection;
