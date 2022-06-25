import { FC, ReactNode } from 'react';

export type FunctionComponentWithChildren<Props> = FC<Props & { children?: ReactNode }>;
export type FCC<Props = unknown> = FunctionComponentWithChildren<Props>;
