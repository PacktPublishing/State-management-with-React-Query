import { makeObservable, observable, action } from "mobx";

class Counter {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
      reset: action,
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}

const myCounter = new Counter();

export const MobxActions = {
  increment: () => myCounter.increment(),
  decrement: () => myCounter.decrement(),
  reset: () => myCounter.reset(),
};

export default myCounter;
