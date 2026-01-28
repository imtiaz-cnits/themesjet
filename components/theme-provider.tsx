"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// FIX: Extract the props directly from the component to avoid import errors
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
