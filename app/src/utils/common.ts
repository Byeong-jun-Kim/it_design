export const sleep = (second: number) => new Promise<void>(resolve => setTimeout(() => resolve(), second * 1000));

export const toInt = (n: number) => Math.floor(n + 0.00001);
