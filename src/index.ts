/**
 * A logger with one method per severity level, from `trace`, the most
 * detailed, up to `error`.
 *
 * How entries are formatted, where they are written and which levels are
 * enabled is up to the implementation.
 *
 * @example
 * ```ts
 * import type { Logger } from '@armscye/logger';
 *
 * class OrderService {
 *   constructor(private readonly logger: Logger) {}
 *
 *   place(id: string): void {
 *     this.logger.info('Placing order %s', id);
 *   }
 * }
 *
 * new OrderService(console);
 * ```
 */
export interface Logger {
  /**
   * Logs a message at the TRACE level.
   *
   * @param msg - The message, usually a string. Implementations must accept
   * any value.
   * @param args - Values for placeholders such as `%s` in `msg`. How any others
   * are handled depends on the implementation; some drop them.
   * @returns Ignored; an implementation can return anything.
   */
  trace(msg: unknown, ...args: unknown[]): unknown;

  /**
   * Logs a message at the DEBUG level.
   *
   * @param msg - The message, usually a string. Implementations must accept
   * any value.
   * @param args - Values for placeholders such as `%s` in `msg`. How any others
   * are handled depends on the implementation; some drop them.
   * @returns Ignored; an implementation can return anything.
   */
  debug(msg: unknown, ...args: unknown[]): unknown;

  /**
   * Logs a message at the INFO level.
   *
   * @param msg - The message, usually a string. Implementations must accept
   * any value.
   * @param args - Values for placeholders such as `%s` in `msg`. How any others
   * are handled depends on the implementation; some drop them.
   * @returns Ignored; an implementation can return anything.
   */
  info(msg: unknown, ...args: unknown[]): unknown;

  /**
   * Logs a message at the WARN level.
   *
   * @param msg - The message, usually a string. Implementations must accept
   * any value.
   * @param args - Values for placeholders such as `%s` in `msg`. How any others
   * are handled depends on the implementation; some drop them.
   * @returns Ignored; an implementation can return anything.
   */
  warn(msg: unknown, ...args: unknown[]): unknown;

  /**
   * Logs a message at the ERROR level.
   *
   * @param msg - The message, usually a string. Implementations must accept
   * any value.
   * @param args - Values for placeholders such as `%s` in `msg`. How any others
   * are handled depends on the implementation; some drop them.
   * @returns Ignored; an implementation can return anything.
   */
  error(msg: unknown, ...args: unknown[]): unknown;
}
