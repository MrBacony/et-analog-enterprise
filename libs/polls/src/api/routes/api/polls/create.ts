import { defineEventHandler, H3Event } from 'h3';
import { PollsService } from '../../../services/polls.service';
import { inject } from '@analog-tools/inject';
import { Poll } from '../../../../lib/polls/models/polls';

export default defineEventHandler((event: H3Event) => {
  const randomPoll: Poll = {
    id: '3',
    question: 'What is your favorite color?',
    name: 'Favorite Color Poll',
    owner: 'user2',
    options: [
      { id: 'option1', value: 'Red' },
      { id: 'option2', value: 'Blue' },
      { id: 'option3', value: 'Green' },
    ],
  };

  return inject(PollsService).addPoll(randomPoll);
});
