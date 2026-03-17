import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { store } from './store/store';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7c3aed' },
    secondary: { main: '#ec4899' },
    success: { main: '#10b981' },
    background: {
      default: '#f5f3ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#241b3a',
      secondary: '#6b6285',
    },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background:
            'radial-gradient(circle at top left, rgba(236,72,153,0.12), transparent 28%), radial-gradient(circle at top right, rgba(124,58,237,0.14), transparent 30%), linear-gradient(180deg, #f8f5ff 0%, #f3f0ff 100%)',
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
        contained: ({ theme }) => ({
          boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, 0.22)}`,
          '&:hover': {
            boxShadow: `0 18px 36px ${alpha(theme.palette.primary.main, 0.28)}`,
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: alpha(theme.palette.primary.main, 0.16),
          backgroundColor: alpha(theme.palette.common.white, 0.74),
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.3),
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 24,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: '0 18px 38px rgba(66, 42, 116, 0.08)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(249,247,255,0.96) 100%)',
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 28,
          boxShadow: '0 28px 60px rgba(49, 28, 94, 0.18)',
          backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.white, 1)} 0%, ${alpha('#f7f2ff', 1)} 100%)`,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);