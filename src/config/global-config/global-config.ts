import { Mode } from './types';

export class GlobalConfig {
  private _mode: Mode;
  private _baseAdottamiURL: string;

  constructor() {
    this._mode = process.env.NODE_ENV ?? 'development';
    this._baseAdottamiURL = process.env.NEXT_PUBLIC_ADOTTAMI_URL;
  }

  mode(): Mode {
    return this._mode;
  }

  baseAdottamiURL(): string {
    return this._baseAdottamiURL;
  }
}

const globalConfig = new GlobalConfig();

export default globalConfig;
