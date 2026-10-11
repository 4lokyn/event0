'use server'

import { z } from 'zod';
import {getServerSession} from "next-auth";
import {venueSchema} from "@/lib/validations/venu";
import DBconnect from "@/lib/db";
import Venue from "@/lib/models/venue";
import {revalidatePath} from "next/cache";

export const addFormVenue = async (payload) => {
    const session = await getServerSession();
    if(!session) return {error: 'You must be signed in'}

    const validatePayload = venueSchema.safeParse(payload);

    if(!validatePayload.success) {
        return { fieldErrors: z.flattenError(validatePayload.error).fieldErrors }
    }
    await DBconnect();

    try {
        await Venue.create(validatePayload.data);
        revalidatePath('/dashboard/add_event')
        return {
            message: 'Venue is successfully created!'
        }

    } catch(e) {
        if (e.code === 11000) return { fieldErrors: { name: ['Venue already exists'] } };
        return { error: 'Something went wrong' };
    }

}