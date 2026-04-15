import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    stripeCustomerId: { type: String, default: null },
    subscriptionStatus: { type: String, enum: ['free', 'active', 'past_due', 'canceled'], default: 'free' },
    subscriptionPlan: { type: String, enum: ['free', 'pro'], default: 'free' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(input) {
  return bcrypt.compare(input, this.password);
};

export default mongoose.model('User', userSchema);
