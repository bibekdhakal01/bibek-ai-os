"use client";

import { create } from "zustand";

interface OSState {
  isBooted: boolean;
  isMuted: boolean;
  activeWindows: string[];
  focusedWindow: string | null;
  boot: () => void;
  toggleMute: () => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  isBooted: false,
  isMuted: true, // Default muted to comply with browser autoplay policies
  activeWindows: [],
  focusedWindow: null,
  boot: () => set({ isBooted: true }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  openWindow: (id) =>
    set((state) => {
      const active = state.activeWindows.includes(id)
        ? state.activeWindows
        : [...state.activeWindows, id];
      return { activeWindows: active, focusedWindow: id };
    }),
  closeWindow: (id) =>
    set((state) => {
      const active = state.activeWindows.filter((w) => w !== id);
      const nextFocus = active.length > 0 ? active[active.length - 1] : null;
      return { activeWindows: active, focusedWindow: nextFocus };
    }),
  focusWindow: (id) => set({ focusedWindow: id }),
}));
