export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{task.description || 'No description'}</p>
        </div>
        <span className="rounded bg-slate-800 px-2 py-1 text-xs capitalize">{task.status.replace('_', ' ')}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={onToggle} className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-medium">Mark complete</button>
        <button onClick={onDelete} className="rounded bg-rose-600 px-2.5 py-1 text-xs font-medium">Delete</button>
      </div>
    </article>
  );
}
