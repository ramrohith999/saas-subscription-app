export default function PricingCard({ title, price, features, cta, highlighted, onClick }) {
  return (
    <article className={`rounded-2xl border p-6 ${highlighted ? 'border-indigo-500 bg-slate-900' : 'border-slate-700 bg-slate-950'}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-3xl font-black">{price}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <button onClick={onClick} className={`mt-6 w-full rounded py-2 font-semibold ${highlighted ? 'bg-indigo-600' : 'bg-slate-800'}`}>
        {cta}
      </button>
    </article>
  );
}
