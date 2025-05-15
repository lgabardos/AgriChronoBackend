import { describe, expect, test } from 'vitest';

import Mutex from '../../src/util/Mutex.js';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('Mutex', () => {
  test('Without Mutex', async () => {
    const state = {
      counter: 0,
    };

    const worker = async (delay: number, count: number) => {
      let workerCopyOfCounter: number;

      for (let i = 0; i < count; i++) {
        // Acquire the counter

        workerCopyOfCounter = state.counter;

        await sleep(delay);

        // Increment the local copy

        workerCopyOfCounter++;

        await sleep(delay);

        // Write the local copy back to the global counter

        state.counter = workerCopyOfCounter;

        await sleep(delay);

        await sleep(delay);
      }
    };

    // Create two workers with different delays. If the code is working,

    // state.counter will equal 15 when both workers are finished.

    await Promise.all([worker(20, 10), worker(55, 5)]).then(() => {
      expect(state.counter).not.toBe(15);
    });
  });

  test('With Mutex', async () => {
    const state = {
      counter: 0,
    };

    const worker = async (delay: number, count: number) => {
      let workerCopyOfCounter: number;

      for (let i = 0; i < count; i++) {
        // Lock the mutex

        const unlock = await Mutex.acquire('SHARED');

        // Acquire the counter

        workerCopyOfCounter = state.counter;

        await sleep(delay);

        // Increment the local copy

        workerCopyOfCounter++;

        await sleep(delay);

        // Write the local copy back to the global counter

        state.counter = workerCopyOfCounter;

        await sleep(delay);

        // Unlock the mutex

        unlock();

        await sleep(delay);
      }
    };

    // Create two workers with different delays. If the code is working,

    // state.counter will equal 15 when both workers are finished.

    await Promise.all([worker(20, 10), worker(55, 5)]).then(() => {
      expect(state.counter).toBe(15);
    });
  });

  test('Try to test mutex with parallel calls', async () => {
    const unlock = await Mutex.acquire('SHARED');

    setTimeout(() => {
      unlock();
    }, 2000);

    await new Promise((resolve) => {
      setTimeout(async () => {
        const unlock3 = await Mutex.acquire('SHARED');

        await sleep(500);

        unlock3();

        setTimeout(() => resolve(true), 100);
      }, 100);

      setTimeout(async () => {
        const unlock2 = await Mutex.acquire('SHARED');

        await sleep(500);

        unlock2();
      }, 10);
    });
  });
});
