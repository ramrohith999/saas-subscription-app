import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export async function register(req, res) {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password });
  const token = generateToken({ userId: user._id });

  return res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      subscriptionPlan: user.subscriptionPlan,
      subscriptionStatus: user.subscriptionStatus,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken({ userId: user._id });
  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      subscriptionPlan: user.subscriptionPlan,
      subscriptionStatus: user.subscriptionStatus,
    },
  });
}

export async function me(req, res) {
  return res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    subscriptionPlan: req.user.subscriptionPlan,
    subscriptionStatus: req.user.subscriptionStatus,
  });
}
