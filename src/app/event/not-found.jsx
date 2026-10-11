import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex w-full flex-1 items-center justify-center px-4 py-24">
            <div className="w-full max-w-2xl">
                {/* ticket */}
                <div className="flex flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-surface shadow-xl sm:flex-row">
                    {/* stub */}
                    <div className="flex flex-col items-center justify-center bg-accent px-8 py-8 text-accent-foreground sm:w-48">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">Error</span>
                        <span className="font-anton text-7xl leading-none tracking-wide">404</span>
                        <span className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] opacity-80">No entry</span>
                    </div>

                    {/* body */}
                    <div className="flex flex-1 flex-col justify-center gap-3 p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                            Admit none
                        </p>
                        <h1 className="font-anton text-4xl leading-none tracking-wide text-foreground">
                            Event not found
                        </h1>
                        <p className="text-muted">
                            This show doesn&apos;t exist, was cancelled, or the link is wrong.
                            Plenty of other nights are coming up though.
                        </p>

                        <div className="mt-4">
                            <Link href="/" className="button button--primary">
                                Browse all events
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
