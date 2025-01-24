import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { appTheme } from '../theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithTheme = (ui: React.ReactElement, options?: any) => {
  return render(<ThemeProvider theme={appTheme}>{ui}</ThemeProvider>, options);
};

export * from '@testing-library/react';
export { renderWithTheme };
