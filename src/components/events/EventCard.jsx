'use client'
import {Button, Card} from "@heroui/react";
import {useRouter} from "next/navigation";

const dateFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
});

export default function EventCard({ event }) {
    const router = useRouter();
    const onReadMore = (slug) => {
        router.push(`/event/${slug}`)
    }
    return (
        <Card className="h-full border border-foreground/15 shadow-sm transition-colors hover:border-accent/60">
            <Card.Header>
                <p className="text-sm font-medium text-accent">
                    {dateFormat.format(new Date(event.date))}
                </p>
                <Card.Title className="font-anton text-2xl leading-tight tracking-wide text-foreground">
                    {event.name}
                </Card.Title>
            </Card.Header>
            <Card.Content>
                <Card.Description className="line-clamp-3">
                    {event.description}
                </Card.Description>
            </Card.Content>
            <Card.Footer className="mt-auto flex-col items-stretch gap-4">
                {event.venue && (
                    <div>
                        <p className="text-sm font-medium text-foreground">{event.venue.name}</p>
                        <p className="text-sm text-muted">
                            {event.venue.address}, {event.venue.state}
                        </p>
                    </div>
                )}
                {event.slug ?
                    <div className="border-t border-foreground/10 pt-4">
                        <Button variant="secondary" fullWidth onPress={()=> onReadMore(event.slug)}>
                            Read more
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Button>
                    </div>
                : null }
            </Card.Footer>
        </Card>
    );
}
