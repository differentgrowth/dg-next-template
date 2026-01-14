import type { ComponentType, ReactNode } from "react";

import dynamic from "next/dynamic";

interface DynamicOptions {
  /** Disable server-side rendering for this component */
  ssr?: boolean;
  /** Loading component to show while the main component loads */
  loading?: () => ReactNode;
}

/**
 * Creates a dynamically imported component with consistent defaults.
 *
 * Use this for heavy components that aren't needed on initial page load:
 * - Charts and data visualization libraries
 * - Rich text editors
 * - Maps and geolocation components
 * - PDF viewers
 * - Code editors with syntax highlighting
 *
 * @example
 * // Basic usage
 * const Chart = lazyLoad(() => import("@/components/Chart"));
 *
 * // With custom loading state
 * const Editor = lazyLoad(
 *   () => import("@/components/Editor"),
 *   { loading: () => <EditorSkeleton /> }
 * );
 *
 * // Client-only component (no SSR)
 * const Map = lazyLoad(
 *   () => import("@/components/Map"),
 *   { ssr: false }
 * );
 */
export function lazyLoad<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicOptions = {}
): ComponentType<P> {
  const { ssr = true, loading } = options;

  return dynamic(importFn, {
    ssr,
    loading,
  }) as ComponentType<P>;
}

/**
 * Creates a dynamically imported named export component.
 *
 * @example
 * const Dialog = lazyLoadNamed(
 *   () => import("@/components/ui/dialog"),
 *   "Dialog"
 * );
 */
export function lazyLoadNamed<
  P extends object,
  K extends string,
  M extends Record<K, ComponentType<P>>,
>(
  importFn: () => Promise<M>,
  exportName: K,
  options: DynamicOptions = {}
): ComponentType<P> {
  const { ssr = true, loading } = options;

  return dynamic(
    () => importFn().then((mod) => ({ default: mod[exportName] })),
    {
      ssr,
      loading,
    }
  ) as ComponentType<P>;
}

/**
 * Preloads a component module on user intent (hover, focus).
 * Call this in onMouseEnter or onFocus handlers to start loading
 * before the user actually needs the component.
 *
 * @example
 * <button
 *   onMouseEnter={() => preloadComponent(() => import("@/components/Modal"))}
 *   onClick={() => setShowModal(true)}
 * >
 *   Open Modal
 * </button>
 */
export function preloadComponent<T>(importFn: () => Promise<T>): void {
  importFn().catch(() => undefined);
}
