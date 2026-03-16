import { useMemo } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import TaskModal from '../components/TaskModal.jsx';
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from '../hooks/useTasks.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: tasks = [], isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const completedCount = useMemo(() => tasks.filter((task) => task.status === 'done').length, [tasks]);

  return (
    <main className="space-y-4">
      <header className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <p className="mt-1 text-slate-300">Plan: <strong className="capitalize">{user?.subscriptionPlan}</strong> · Status: <strong className="capitalize">{user?.subscriptionStatus}</strong></p>
        <p className="text-sm text-slate-400">Tasks completed: {completedCount} / {tasks.length}</p>
      </header>

      <TaskModal onCreate={(payload) => createTask.mutateAsync(payload)} />

      <section className="grid gap-3 md:grid-cols-2">
        {isLoading && <p className="text-slate-400">Loading tasks...</p>}
        {error && <p className="text-rose-400">{error.response?.data?.message || 'Failed to load tasks'}</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={() => updateTask.mutate({ id: task._id, payload: { status: 'done' } })}
            onDelete={() => deleteTask.mutate(task._id)}
          />
        ))}
      </section>
    </main>
  );
}
