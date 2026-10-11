import DBconnect from "@/lib/db";
import States from "@/lib/models/states";
import {revalidateTag} from "next/cache";

export async function GET(request) {
    await DBconnect();

    try {
        const getStates = await States.find({}).select('name').sort({ name: 1 }).lean();

        const states = getStates.map((state) => ({
            id: state._id.toString(),
            name: state.name,
        }));

        return Response.json(states, { status: 200 })
    } catch (e) {
        return Response.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

export async function POST(request) {
    await DBconnect();
    const {name} = await request.json();

    try {
        const res = await States.create({name});
        revalidateTag('states', 'max')
        return Response.json({res}, {status: 200})

    } catch (e) {
        if (e.code === 11000) {
            return Response.json({ error: 'State already exists' }, { status: 409 });
        }
        if (e.name === 'ValidationError') {
            return Response.json({ error: Object.values(e.errors)[0].message }, { status: 400 });
        }
            return Response.json({ error: 'Something went wrong' }, { status: 500})
        }

}