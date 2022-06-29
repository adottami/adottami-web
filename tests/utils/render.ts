import {
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { ReactElement } from 'react';

import TestProviders from './test-providers';

export function renderWithTestProviders(element: ReactElement, options?: RenderOptions): RenderResult {
  return render(element, { wrapper: TestProviders, ...options });
}

export function renderHookWithTestProviders<Props, Result>(
  hook: (props: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Result, Props> {
  return renderHook(hook, { wrapper: TestProviders, ...options });
}
