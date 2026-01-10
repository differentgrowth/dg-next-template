/**
 * Loading UI for route segments
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/loading
 *
 * This is shown while the page content is loading.
 * Uses CSS animations for a smooth, performant loading state.
 */
export default function Loading() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative size-12">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>

        {/* Text */}
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
