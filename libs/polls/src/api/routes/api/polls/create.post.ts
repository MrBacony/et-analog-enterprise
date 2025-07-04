import { defineEventHandler, H3Event, readBody, createError } from 'h3';
import { PollsService } from '../../../services/polls.service';
import { inject } from '@analog-tools/inject';
import { Poll, CreatePollSchema } from '../../../../lib/polls/models/polls';
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Read and validate the request body
    const body = await readBody(event);
    
    // Validate the request against the CreatePoll schema
    const validatedData = CreatePollSchema.parse(body);
    
    // Transform the CreatePollRequest to a Poll by adding IDs
    const poll: Poll = {
      id: uuidv4(),
      name: validatedData.name,
      question: validatedData.question,
      owner: validatedData.owner,
      options: validatedData.options.map(option => ({
        id: uuidv4(),
        value: option.value
      }))
    };

    // Add the poll using the service
    inject(PollsService).addPoll(poll);
    
    // Return success response
    return {
      id: poll.id,
      message: 'Poll created successfully'
    };
    
  } catch (error) {
    // Handle validation errors
    if (error instanceof Error) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid poll data: ${error.message}`
      });
    }
    
    // Handle unexpected errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create poll'
    });
  }
});
