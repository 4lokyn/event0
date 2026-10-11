import 'server-only';
import DBconnect from "@/lib/db";
import Venue from "@/lib/models/venue";

export async function getVenues() {
    await DBconnect();

    const venues = await Venue.find({}).sort('name').lean();

    return venues.map((venue) => ({
        id: venue._id.toString(),
        name: venue.name,
        state: venue.state,
        address: venue.address,
    }));
}
