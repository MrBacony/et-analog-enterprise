import { inject } from '@analog-tools/inject';
import { defineEventHandler, H3Event, getRouterParam, createError } from 'h3';
import { PollsService } from '../../../services/polls.service';

export default defineEventHandler((event: H3Event) => {
    const pollId = getRouterParam(event, 'pollId');
    if (!pollId) {
        throw createError({
      statusCode: 500,
      statusMessage: 'No poll ID provided',
    });
    }

    const poll = inject(PollsService).getPoll(pollId);
    if (!poll) {
        throw createError({
      statusCode: 404,
      statusMessage: `Poll with ID ${pollId} not found`,
    });
    }
});