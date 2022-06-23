import { GlobalConfig } from '../global-config';

describe('Global config', () => {
  it('should initialize with the correct mode', () => {
    const globalConfig = new GlobalConfig();
    expect(globalConfig.mode()).toBe('test');
    expect(globalConfig.baseAdottamiURL()).toBe('http://localhost:3333');
  });
});
