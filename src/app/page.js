import Image from "next/image";
import {getEvents} from "@/lib/data/events";
import EventCards from "@/components/events/EventCards";

export default async function Page() {
    const events = await getEvents();

    return (
        <>
        <section className="relative flex h-[60vh] min-h-80 w-full items-end">
            <Image
                src="/home/event-head.jpg"
                alt="Crowd in front of a lit concert stage"
                fill
                sizes="100vw"
                loading="eager"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-to from-black/80 via-black/30 to-transparent" />
            <div className="relative mx-auto w-full max-w-5xl px-4 pb-10">
                <h1 className="font-anton text-5xl tracking-wide text-white sm:text-6xl">
                    Find your next live show
                </h1>
                <p className="mt-2 max-w-xl text-lg text-white/80">
                    Concerts, festivals and club nights near you.
                </p>
            </div>
        </section>

        <main className="mx-auto w-full max-w-5xl px-4 py-10">
            <h2 className="font-anton mb-8 text-4xl tracking-wide text-foreground">
                Upcoming events
            </h2>

            <EventCards initialShows={events} />
        </main>
        </>
    );
}
