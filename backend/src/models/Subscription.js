import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    stripeSubscriptionId: { type: String, required: true, unique: true },
    plan: { type: String, enum: ['free', 'pro'], default: 'pro' },
    status: { type: String, enum: ['active', 'past_due', 'canceled', 'incomplete'], default: 'incomplete' },
    renewalDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('Subscription', subscriptionSchema);
