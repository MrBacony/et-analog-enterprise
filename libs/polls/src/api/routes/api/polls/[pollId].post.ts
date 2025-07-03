import { defineEventHandler, H3Event, getRouterParam, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {

    const postData = await readBody(event) || {};

    return {pollId: getRouterParam(event, 'pollId'), body: postData};
});