import logger from './hooks/logger-hook';
import { EventEmitter } from 'events';
import { createEvent} from './event-emitter';

const hooks = [];

if (process.env.NODE_ENV === 'development') {
  hooks.push(logger);
}
export const event = createEvent(new EventEmitter(), hooks);
