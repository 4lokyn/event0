import { z } from 'zod';

export const venueSchema = z.object({
    name: z.string().trim().min(1, 'Venue name is required'),
    address: z.string().trim().min(1, 'Address is required'),
    state: z.string().min(1, 'Please select a state'),
})