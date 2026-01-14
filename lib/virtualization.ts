/**
 * Virtualization utilities for rendering large lists efficiently.
 *
 * Use virtualization when rendering 100+ items to avoid DOM performance issues.
 * This module provides utilities to work with @tanstack/react-virtual.
 *
 * Installation:
 * pnpm add @tanstack/react-virtual
 *
 * @example
 * import { useVirtualizer } from "@tanstack/react-virtual";
 * import { getVirtualizerConfig, VirtualListContainer } from "@/lib/virtualization";
 *
 * function VirtualList({ items }: { items: Item[] }) {
 *   const parentRef = useRef<HTMLDivElement>(null);
 *
 *   const virtualizer = useVirtualizer({
 *     ...getVirtualizerConfig(items.length, 50),
 *     getScrollElement: () => parentRef.current,
 *   });
 *
 *   return (
 *     <div ref={parentRef} style={{ height: 400, overflow: "auto" }}>
 *       <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
 *         {virtualizer.getVirtualItems().map((virtualRow) => (
 *           <div
 *             key={virtualRow.key}
 *             style={{
 *               position: "absolute",
 *               top: 0,
 *               left: 0,
 *               width: "100%",
 *               transform: `translateY(${virtualRow.start}px)`,
 *             }}
 *           >
 *             {items[virtualRow.index].name}
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * }
 */

/**
 * Threshold for when to consider using virtualization.
 * Lists with more than this many items should be virtualized.
 */
export const VIRTUALIZATION_THRESHOLD = 100;

/**
 * Check if a list should be virtualized based on item count.
 */
export function shouldVirtualize(itemCount: number): boolean {
  return itemCount > VIRTUALIZATION_THRESHOLD;
}

/**
 * Configuration options for virtualizer.
 */
export interface VirtualizerConfig {
  count: number;
  estimateSize: () => number;
  overscan: number;
}

/**
 * Get default virtualizer configuration.
 *
 * @param count - Total number of items
 * @param itemHeight - Estimated height of each item in pixels
 * @param overscan - Number of items to render outside visible area (default: 5)
 */
export function getVirtualizerConfig(
  count: number,
  itemHeight: number,
  overscan = 5
): VirtualizerConfig {
  return {
    count,
    estimateSize: () => itemHeight,
    overscan,
  };
}

/**
 * Calculate container height for a virtual list.
 *
 * @param maxVisibleItems - Maximum items to show at once
 * @param itemHeight - Height of each item
 */
export function getContainerHeight(
  maxVisibleItems: number,
  itemHeight: number
): number {
  return maxVisibleItems * itemHeight;
}

/**
 * Styles for virtual list container.
 */
export const virtualContainerStyles = {
  overflow: "auto",
  position: "relative" as const,
};

/**
 * Get styles for virtual list inner container.
 */
export function getVirtualListStyles(totalSize: number) {
  return {
    height: totalSize,
    width: "100%",
    position: "relative" as const,
  };
}

/**
 * Get styles for virtual row positioning.
 */
export function getVirtualRowStyles(start: number) {
  return {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    transform: `translateY(${start}px)`,
  };
}
