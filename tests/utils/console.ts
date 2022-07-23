export function ignoreConsole(methodName: 'error') {
  const consoleMethodSpy = jest.spyOn(console, methodName).mockImplementation(() => {});

  return function restoreConsole() {
    consoleMethodSpy.mockRestore();
  };
}
