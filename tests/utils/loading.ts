import { screen, waitFor } from '@testing-library/react';

export async function waitForLoadingToFinish() {
  await waitFor(() => {
    const loadingIndicatorElements = [
      ...screen.queryAllByText(/.*carregando.*/i),
      ...screen.queryAllByLabelText(/.*carregando.*/i),
    ];

    loadingIndicatorElements.forEach((element) => {
      expect(element).not.toBeVisible();
    });
  });
}
