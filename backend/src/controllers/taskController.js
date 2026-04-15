import Task from '../models/Task.js';

const FREE_PLAN_LIMIT = 10;

export async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return res.json(tasks);
}

export async function createTask(req, res) {
  if (req.user.subscriptionPlan === 'free') {
    const count = await Task.countDocuments({ userId: req.user._id });
    if (count >= FREE_PLAN_LIMIT) {
      return res.status(403).json({ message: 'Free plan task limit reached (10). Upgrade to Pro.' });
    }
  }

  const task = await Task.create({ ...req.body, userId: req.user._id });
  return res.status(201).json(task);
}

export async function updateTask(req, res) {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.status(204).send();
}
