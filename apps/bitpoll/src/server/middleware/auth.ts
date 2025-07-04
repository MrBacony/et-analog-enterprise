import {defineEventHandler, H3Event} from 'h3';
import {useAnalogAuth} from '@analog-tools/auth';
import {authConfig} from '../../auth.config';

export default defineEventHandler(async (event: H3Event) => {
  return useAnalogAuth(authConfig, event);
});