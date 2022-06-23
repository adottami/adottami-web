import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks';
import { FC, ReactElement } from 'react';

import TestProviders from './test-providers';

export function renderWithTestProviders(element: ReactElement, options?: RenderOptions): RenderResult {
  return render(element, { wrapper: TestProviders, ...options });
}

export function renderHookWithTestProviders<Props, Result>(
  hook: (props: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Props, Result> {
  return renderHook(hook, { wrapper: TestProviders as FC, ...options });
}
