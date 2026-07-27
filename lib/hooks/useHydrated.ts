"use client";

import { useSyncExternalStore } from "react";

/** Nothing ever changes after hydration, so there is nothing to subscribe to. */
const subscribe = () => () => {};

/**
 * `false` on the server and during hydration, `true` once the client has taken over.
 *
 * Chrome whose markup depends on client-only state (the resolved theme, an open
 * menu) must render the server shape first or hydration mismatches. That was
 * written as `useState(false)` plus `useEffect(() => setMounted(true), [])` in
 * both Header and ThemeToggle — two copies of a pattern React's own
 * `react-hooks/set-state-in-effect` rule now rejects, because a setState in an
 * effect body schedules a second render pass. `useSyncExternalStore` gets the
 * same one-way flip as a first-class render input instead.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
