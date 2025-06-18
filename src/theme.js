import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#7c3aed' },
          background: { default: '#f9fafb', paper: '#fff' },
          text: { primary: '#000' },
        }
      : {
          primary: { main: '#8b5cf6' },
          background: { default: '#121212' },
          text: { primary: '#fff' },
        }),
  },
});
