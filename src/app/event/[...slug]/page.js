import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Card} from "@heroui/react";
import {getEvent} from "@/lib/data/event";

const longDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
});

const shortDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = await getEvent(slug.join('/'));


    return {
        title: event ? `${event.name} | Evento` : 'Event not found | Evento',
        description: event?.description,
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const event = await getEvent(slug.join('/'));

    if (!event) notFound();

    const date = new Date(event.date);

    return (
        <>
            <section className="relative flex min-h-80 w-full items-end">
                <Image
                    src="/home/event-head.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    loading="eager"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />

                <div className="relative mx-auto w-full max-w-5xl px-4 pt-16 pb-10">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M19 12H5M11 18l-6-6 6-6" />
                        </svg>
                        All events
                    </Link>

                    <p className="mb-3 text-sm font-medium text-white/80">{longDate.format(date)}</p>

                    <div className="flex items-center gap-5">
                        <div className="flex shrink-0 flex-col items-center rounded-lg bg-accent px-4 py-2 text-accent-foreground">
                            <span className="font-anton text-3xl leading-none">{date.getUTCDate()}</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">
                                {shortDate.format(date).split(' ')[0]}
                            </span>
                        </div>
                        <h1 className="font-anton text-4xl leading-none tracking-wide text-white sm:text-6xl">
                            {event.name}
                        </h1>
                    </div>
                </div>
            </section>

            <main className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1fr_320px]">
                <article>
                    <h2 className="font-anton mb-4 text-2xl tracking-wide text-foreground">
                        About the event
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-foreground/80">
                        {event.description}
                    </p>
                </article>

                <aside>
                    <Card className="border border-foreground/15 shadow-sm md:sticky md:top-20">
                        <Card.Content className="flex flex-col gap-5">
                            <div className="flex gap-3">
                                <svg className="mt-0.5 shrink-0 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Date</p>
                                    <p className="text-sm font-medium text-foreground">{longDate.format(date)}</p>
                                </div>
                            </div>

                            {event.venue && (
                                <div className="flex gap-3 border-t border-foreground/10 pt-5">
                                    <svg className="mt-0.5 shrink-0 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Venue</p>
                                        <p className="text-sm font-medium text-foreground">{event.venue.name}</p>
                                        <p className="text-sm text-muted">{event.venue.address}</p>
                                        <p className="text-sm text-muted">{event.venue.state}</p>
                                    </div>
                                </div>
                            )}
                        </Card.Content>
                    </Card>
                </aside>
            </main>
        </>
    );
}
