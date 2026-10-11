import DBconnect from "@/lib/db";
import Venue from "@/lib/models/venue";

export async function GET(request) {
    await DBconnect();

    try {
        const res = await Venue.find({}).sort('name').lean();
        const venues = res.map((venue) => {
            return {
                id: venue._id.toString(),
                name: venue.name,
                state: venue.state,
                address: venue.address,
            }
        })
        return Response.json({data: venues}, {status: 200})
    } catch (e) {
        return Response.json({error: 'Something went wrong'})
    }

}