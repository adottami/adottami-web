import {
  createContext as createReactContext,
  useContext as useReactContext,
  Context as ReactContext,
  Provider as ReactProvider,
} from 'react';

interface Context<ContextValue> {
  Context: ReactContext<ContextValue | undefined>;
  Provider: ReactProvider<ContextValue | undefined>;
  useContext: () => ContextValue;
}

export function createContext<ContextValue>(
  contextName: string,
  initialValue: ContextValue | undefined = undefined,
): Context<ContextValue> {
  const Context = createReactContext<ContextValue | undefined>(initialValue);

  function useContext(): ContextValue {
    const contextValue = useReactContext(Context);
    if (contextValue) return contextValue;
    throw new Error(`Cannot use 'use${contextName}' outside of a '${contextName}Provider'`);
  }

  return { Context, Provider: Context.Provider, useContext };
}
