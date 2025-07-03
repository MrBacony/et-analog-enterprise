import {
  defineEventHandler,
  H3Event,
  getRouterParam,
  readBody,
  createError,
} from 'h3';
import { UpdatePollSchema } from '../../../../lib/polls/models/polls';
import { inject } from '@analog-tools/inject';
import { PollsService } from '../../../services/polls.service';

export default defineEventHandler(async (event: H3Event) => {
  const pollId = getRouterParam(event, 'pollId');
  if (!pollId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No poll ID provided',
    });
  }

  const postData = readBody(event) || {};

  const parsed = UpdatePollSchema.parse(postData);

  if (!parsed) {
    throw new Error('Invalid poll data');
  }

  inject(PollsService).updatePoll(pollId, parsed);

  return { pollId: getRouterParam(event, 'pollId'), body: postData };
});
