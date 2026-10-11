import AddEventForm from "@/components/forms/AddEventForm";
import {getVenues} from "@/lib/data/venues";

export default async function AddEventPage() {
    const venues = await getVenues();

    return(
        <AddEventForm venues={venues} />
    )
}
