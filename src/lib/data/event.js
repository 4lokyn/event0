import 'server-only';
import {cache} from "react";
import DBconnect from "@/lib/db";
import Events from "@/lib/models/events";
import "@/lib/models/venue";

// cache: generateMetadata and the page share one DB query per request
export const getEvent = cache(async (slug) => {
    await DBconnect();

    const event = await Events.findOne({ slug })
        .populate('venue', 'name address state')
        .lean();

    if (!event) return null;

    return {
        id: event._id.toString(),
        name: event.name,
        description: event.description,
        date: event.date,
        slug: event.slug,
        venue: event.venue && {
            id: event.venue._id.toString(),
            name: event.venue.name,
            address: event.venue.address,
            state: event.venue.state,
        },
    };
});
