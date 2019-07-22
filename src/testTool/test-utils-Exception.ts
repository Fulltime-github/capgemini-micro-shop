class TestUtilsException extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TestUtilsException.prototype);
  }
}
