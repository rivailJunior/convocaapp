import { z } from 'zod';

// Group schemas
export const createGroupSchema = z.object({
  name: z.string().min(2).max(100),
  sport: z.enum(['futebol', 'volei', 'basquete', 'outro']),
  billingMode: z.enum(['fixed', 'field_split']),
  monthlyFee: z.number().int().positive().optional(),
  fieldCostPerMonth: z.number().int().positive().optional(),
  guestFee: z.number().int().positive().optional(),
  dueDay: z.number().int().min(1).max(28),
  paymentMethods: z.array(z.enum(['pix', 'credit_card', 'debit_card'])).min(1),
});
export type CreateGroupInput = z.infer<typeof createGroupSchema>;

export const updateGroupSchema = createGroupSchema.partial();
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;

// Event schemas
export const createEventSchema = z.object({
  title: z.string().min(2).max(200),
  date: z.string().datetime(),
  recurrence: z.enum(['weekly', 'biweekly', 'monthly', 'once']),
  venueName: z.string().min(2),
  venueAddress: z.string().min(2),
  venueLat: z.number(),
  venueLng: z.number(),
  maxPlayers: z.number().int().positive().optional(),
  confirmationDeadline: z.string().datetime().optional(),
});
export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = createEventSchema.partial();
export type UpdateEventInput = z.infer<typeof updateEventSchema>;

// Attendance
export const attendEventSchema = z.object({
  status: z.enum(['confirmed', 'declined', 'maybe']),
  note: z.string().max(200).optional(),
});
export type AttendEventInput = z.infer<typeof attendEventSchema>;

// Invite
export const createInviteSchema = z.object({
  maxUses: z.number().int().positive().optional(),
  expiresInDays: z.number().int().min(1).max(30).optional(),
});
export type CreateInviteInput = z.infer<typeof createInviteSchema>;

// User
export const registerUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});
export type RegisterUserInput = z.infer<typeof registerUserSchema>;

// Guest (diarista)
export const createGuestSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  uid: z.string().optional(),
  amount: z.number().int().positive(),
});
export type CreateGuestInput = z.infer<typeof createGuestSchema>;

// Treasury
export const createTreasuryEntrySchema = z.object({
  type: z.enum(['in', 'out']),
  category: z.enum(['guest_payment', 'field_payment', 'equipment', 'other']),
  amount: z.number().int().positive(),
  description: z.string().min(2).max(500),
  referenceMonth: z.string().regex(/^\d{4}-\d{2}$/),
});
export type CreateTreasuryEntryInput = z.infer<typeof createTreasuryEntrySchema>;

// Payments
export const generatePaymentsSchema = z.object({
  referenceMonth: z.string().regex(/^\d{4}-\d{2}$/),
});
export type GeneratePaymentsInput = z.infer<typeof generatePaymentsSchema>;

export const confirmPaymentSchema = z.object({
  method: z.enum(['pix', 'credit_card', 'debit_card', 'manual']).optional(),
});
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;

// Voting
export const castVoteSchema = z.object({
  mvpUid: z.string(),
  goals: z.record(z.string(), z.number().int().min(0)),
  assists: z.record(z.string(), z.number().int().min(0)),
  saves: z.record(z.string(), z.number().int().min(0)),
});
export type CastVoteInput = z.infer<typeof castVoteSchema>;
