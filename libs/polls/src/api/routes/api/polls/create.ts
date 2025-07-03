import { defineEventHandler, H3Event } from 'h3';
import { PollsService } from '../../../services/polls.service';
import { inject } from '@analog-tools/inject';
import { Poll } from '../../../../lib/polls/models/polls';

export default defineEventHandler((event: H3Event) => {
  const randomPoll: Poll = {
    id: '4f5d6c7b-8a9b-0c1d-2e3f-4g5h6i7j8k9l', 
    question: 'What is your favorite color?',
    name: 'Favorite Color Poll',
    owner: 'user2',
    options: [
      { id: '4f5d6c7b-8a9b-0c1d-2e3f-4g5h6i7j8k9a', value: 'Red' },
      { id: '4f5d6c7b-8a9b-0c1d-2e3f-4g5h6i7j8k9b', value: 'Blue' },
      { id: '4f5d6c7b-8a9b-0c1d-2e3f-4g5h6i7j8k9c', value: 'Green' },
    ],
  };

  return inject(PollsService).addPoll(randomPoll);
});
