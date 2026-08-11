'use client';

import React from 'react';
import { ThemeProvider } from '../core/theme/ThemeContext.jsx';
import { AuthProvider } from '../core/auth/AuthContext.jsx';
import { DbProvider } from '../core/database/DbContext.jsx';

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DbProvider>
          {children}
        </DbProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
