import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { appTheme } from './theme.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={appTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </ThemeProvider>
)
