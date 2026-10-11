import {getEvents} from "@/lib/data/events";

export async function GET(request) {
    try {
        const res = await getEvents();
        return Response.json({data: res}, {status: 200})
    } catch(e) {
        return Response.json({})
    }
}