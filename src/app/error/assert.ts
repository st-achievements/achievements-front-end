export function assert(
  condition: unknown,
  message = 'Assertion failed',
  errorType: new (msg: string) => Error = Error,
): asserts condition {
  if (!condition) {
    throw new errorType(message);
  }
}
