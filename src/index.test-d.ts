import { describe, expectTypeOf, test } from 'vitest';
import type { Logger } from './index.js';

declare class VoidLogger implements Logger {
  trace(msg: unknown, ...args: unknown[]): void;
  debug(msg: unknown, ...args: unknown[]): void;
  info(msg: unknown, ...args: unknown[]): void;
  warn(msg: unknown, ...args: unknown[]): void;
  error(msg: unknown, ...args: unknown[]): void;
}

declare class StringLogger {
  trace(msg: string): this;
  debug(msg: string): this;
  info(msg: string): this;
  warn(msg: string): this;
  error(msg: string): this;
}

describe('Logger', () => {
  test('every level takes a message and context, and returns anything', () => {
    expectTypeOf<Logger['trace']>().parameters.toEqualTypeOf<
      [msg: unknown, ...args: unknown[]]
    >();
    expectTypeOf<Logger['debug']>().toEqualTypeOf<Logger['trace']>();
    expectTypeOf<Logger['info']>().toEqualTypeOf<Logger['trace']>();
    expectTypeOf<Logger['warn']>().toEqualTypeOf<Logger['trace']>();
    expectTypeOf<Logger['error']>().toEqualTypeOf<Logger['trace']>();
    expectTypeOf<Logger['trace']>().returns.toBeUnknown();
  });

  test('accepts the global console', () => {
    expectTypeOf<Console>().toExtend<Logger>();
  });

  test('accepts implementations that return values or take only strings', () => {
    expectTypeOf<VoidLogger>().toExtend<Logger>();
    expectTypeOf<StringLogger>().toExtend<Logger>();
  });

  test('rejects objects missing a level', () => {
    expectTypeOf<object>().not.toExtend<Logger>();
    expectTypeOf<Omit<Logger, 'trace'>>().not.toExtend<Logger>();
  });
});
