'use client'

import EventCard from "@/components/events/EventCard";
import {useState, useTransition} from "react";
import {Button, Spinner} from "@heroui/react";
import {showToast} from "@/utils/toast";
import {handleLoadMoreShows} from "@/actions/events";

export default function EventCards({ initialShows }) {
    const [isPending, startTransition] = useTransition();
    const [shows, setShows] = useState(initialShows);
    const [hasMore, setHasMore] = useState(true);


    const onLoadMoreShows = async () => {
        startTransition(async () => {
            const skip = shows.length
            const limit = 10;

            const res = await handleLoadMoreShows(skip, limit);

            if (!res.success) {
                showToast({ title: 'Error', description: res.message, variant: 'danger' });
                return;
            }
            setShows((prev) => [...prev, ...res.data]);
            setHasMore(res.hasMore);

        })
    }

    if (!shows?.length) {
        return <p className="text-muted">No events yet.</p>;
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shows.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

            {hasMore ? (
                <div className="mt-10 flex justify-center">
                    <Button isPending={isPending} onPress={() => onLoadMoreShows()}>
                        {isPending && <Spinner color="current" size="sm" />}
                        {isPending ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            ) : null}
        </>
    );
}
