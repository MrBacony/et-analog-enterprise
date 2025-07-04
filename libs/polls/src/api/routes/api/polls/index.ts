import { defineEventHandler, H3Event } from 'h3';
import { PollsService } from '../../../services/polls.service';
import { inject } from '@analog-tools/inject';

export default defineEventHandler((event: H3Event) => {
    return inject(PollsService).getPolls(); 
});