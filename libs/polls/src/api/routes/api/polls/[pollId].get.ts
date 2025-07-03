import { defineEventHandler, H3Event, getRouterParam } from 'h3';

export default defineEventHandler((event: H3Event) => {
    return {pollId: getRouterParam(event, 'pollId')};
});