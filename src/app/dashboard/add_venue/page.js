import AddVenueComponent from "@/components/forms/AddVenueForm";
import {getStates} from "@/lib/data/states";

export default async function AddVenuePage() {
    const states = await getStates();

    return (
        <>
            <AddVenueComponent
                states={states}
            />
        </>
    )
}