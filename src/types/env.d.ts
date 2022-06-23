declare namespace NodeJS {
  type Mode = import('@/config/global-config/global-config').Mode;

  interface ProcessEnv {
    readonly NODE_ENV?: Mode;
    readonly NEXT_PUBLIC_ADOTTAMI_URL: string;
  }
}
