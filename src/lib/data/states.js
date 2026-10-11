import 'server-only';
import DBconnect from "@/lib/db";
import States from "@/lib/models/states";

export async function getStates() {
    await DBconnect();

    const states = await States.find({}).select('name').sort({ name: 1 }).lean();

    return states.map((state) => ({
        id: state._id.toString(),
        name: state.name,
    }));
}
