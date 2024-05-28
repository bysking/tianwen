class EventEmitter {
  events: Record<string, ((...args: any[]) => void)[]> = {};
  constructor() {
    this.events = {};
  }

  on(eventName: string, listener: (...args: any[]) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName: string, ...args: any[]) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  off(eventName: string, listenerToRemove: (...args: any[]) => void) {
    const listeners = this.events[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerToRemove);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
}

export const eventBus = new EventEmitter();
export const eventNameMap = {
  clearRouteState: 'clearRouteState',
};
