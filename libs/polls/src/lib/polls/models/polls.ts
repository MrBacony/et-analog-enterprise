// libs/polls/src/lib/models/poll.model.ts
import { z } from 'zod';

export const PollOptionSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1).max(500)
});

export type PollOption = z.infer<typeof PollOptionSchema>;

export const CreatePollOptionSchema = PollOptionSchema.omit({
  id: true
});

export type CreatePollOption = z.infer<typeof CreatePollOptionSchema>;

export const PollSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  question: z.string().min(1).max(1000),
  owner: z.string(),
  options: z.array(PollOptionSchema).min(2)
});

export type Poll = z.infer<typeof PollSchema>;

export const CreatePollSchema = PollSchema.omit({
  id: true
}).extend({
  options: z.array(CreatePollOptionSchema).min(2)
});

export type CreatePoll = z.infer<typeof CreatePollSchema>;

export const UpdatePollSchema = CreatePollSchema.partial().extend({
  id: z.string().uuid()
});

export type UpdatePoll = z.infer<typeof UpdatePollSchema>;


export const VoteSchema = z.object({
  id: z.string().uuid(),
  pollId: z.string().uuid(),
  optionId: z.string().uuid(), // Vereinfacht: nur eine Option pro Vote
  userId: z.string().uuid().optional() // Optional für anonyme Votes
});

export type Vote = z.infer<typeof VoteSchema>;

export const CreateVoteSchema = VoteSchema.omit({
  id: true
});

export type CreateVote = z.infer<typeof CreateVoteSchema>;

// Für die Abstimmungs-API
export const SubmitVoteSchema = z.object({
  pollId: z.string().uuid(),
  optionId: z.string().uuid()
});

export type SubmitVote = z.infer<typeof SubmitVoteSchema>;