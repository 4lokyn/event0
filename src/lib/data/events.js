import 'server-only';
import DBconnect from "@/lib/db";
import Events from "@/lib/models/events";
import "@/lib/models/venue";

export async function getEvents(skip = 0, limit = 10) {
    await DBconnect();

    const posts = await Events.find({})
        .sort('date')
        .skip(skip)
        .limit(limit)
        .populate('venue', 'name address state')
        .lean();

    return posts.map((post) => ({
        id: post._id.toString(),
        name: post.name,
        description: post.description,
        date: post.date,
        slug: post.slug,
        venue: post.venue && {
            id: post.venue._id.toString(),
            name: post.venue.name,
            address: post.venue.address,
            state: post.venue.state,
        },
    }));
}
