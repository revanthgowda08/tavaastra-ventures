import { useEffect, useLayoutEffect } from "react";

// Avoids React's "useLayoutEffect does nothing on the server" warning for
// client components, which Next.js still renders to HTML on the server.
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
