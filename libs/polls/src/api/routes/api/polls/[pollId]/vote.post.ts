import { defineEventHandler, H3Event, getRouterParam, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {

    const postData = readBody(event) || {};

    return "Successfully voted for poll ID: " + getRouterParam(event, 'pollId') + " with data: " + JSON.stringify(postData);
});