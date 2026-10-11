'use server'

import {getEvents} from "@/lib/data/events";

export const handleLoadMoreShows = async (skip, limit) => {
    try {
        const shows = await getEvents(skip, limit);

        return {
            success: true,
            data: shows,
            hasMore: shows.length === limit,
        };
    } catch (e) {
        console.error(e);
        return {
            success: false,
            message: 'Could not load more events. Please try again.',
        };
    }
}