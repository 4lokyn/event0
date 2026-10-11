'use server'

import {getServerSession} from "next-auth";
import { z } from 'zod';
import {eventSchema} from "@/lib/validations/event";
import Events from "@/lib/models/events";
import DBconnect from "@/lib/db";
import {revalidatePath} from "next/cache";

export const addFormEvent = async (payload) => {
    const session = await getServerSession();
    if (!session) return {error: 'Session is not valid'}

    const result = eventSchema.safeParse(payload);

    if(!result.success) {
        return {
            success: false,
            fieldErrors: z.flattenError(result.error).fieldErrors
        }
    }

    const eventData = { ...result.data, date: new Date(result.data.date) };

    try {
        await DBconnect();
        await Events.create(eventData);

        revalidatePath('/');
        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Event was successfully added!'
        }

    } catch (e) {
        return {
            success: false,
            message: 'Something went wrong, event was not added! Please try again'
        }
    }

}