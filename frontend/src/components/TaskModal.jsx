import { useState } from 'react';

export default function TaskModal({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function submit(event) {
    event.preventDefault();
    await onCreate({ title, description });
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-lg font-semibold">Add task</h3>
      <div className="mt-3 space-y-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Task title" className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Description" className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>
      <button className="mt-3 rounded bg-indigo-600 px-4 py-2 text-sm font-medium">Create Task</button>
    </form>
  );
}
