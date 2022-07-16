import JSDOMEnvironment from 'jest-environment-jsdom';
import { TextEncoder } from 'util';

class TestEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup();
    this.populateTextEncoderIfAbsent();
  }

  private populateTextEncoderIfAbsent() {
    const textEncoderIsAbsent = typeof this.global.TextEncoder === 'undefined';
    if (textEncoderIsAbsent) {
      this.global.TextEncoder = TextEncoder;
    }
  }
}

export default TestEnvironment;
