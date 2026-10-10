"use client";

import { PropsWithChildren } from "react";
// HeroUI v3 uses individual component exports (Button/Card/etc) — no top-level HeroUIProvider required.
// The I18nProvider and RouterProvider from @heroui/react are optional enhancements; we skip them here to keep compat.
// This file is still the client-boundary wrapper that renders app-level client components.
export default function Providers({ children }: PropsWithChildren) {
  return <>{children}</>;
}
