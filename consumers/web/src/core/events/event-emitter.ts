//@ts-nocheck
const DISPATCHED_ACTION = 'DISPATCHED';
const SUBSCRIBED_ACTION = 'SUBSCRIBED';
const UNSUBSCRIBED_ACTION = 'UNSUBSCRIBED';

class Emitter {

  constructor(eventEmitter, hooks) {
    this.eventEmitter = eventEmitter;
    this.hooks =  hooks || [];
  }

  dispatch(event, ...args) {
    this.sendThroughHooks(DISPATCHED_ACTION, event, args);
    this.eventEmitter.emit(event, args);
  }

  subscribe(event, listener) {
    this.sendThroughHooks(SUBSCRIBED_ACTION, event, listener);
    this.eventEmitter.addListener(event, listener);
  }

  unsubscribe(event, listener) {
    if (!listener) {
      this.sendThroughHooks(UNSUBSCRIBED_ACTION, event);
      this.eventEmitter.removeAllListeners(event);
      return;
    }
    this.sendThroughHooks(UNSUBSCRIBED_ACTION, event, listener);
    this.eventEmitter.removeListener(event, listener);
  }

  sendThroughHooks(
    action,
    event,
    payload,
    listener,
  ) {
    this.hooks.forEach((hook) => {
      hook(action, event, {
        payload,
        listener,
        listenerCount: this.eventEmitter.listenerCount(event),
      });
    });
  }
}

export function createEvent(
  emitter,
  hooks
){
  return new Emitter(emitter, hooks);
}
