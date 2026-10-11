import { z } from 'zod';

export const eventSchema = z.object({
    name: z.string().min(1, 'Name of the artist is required!'),
    venue: z.string('Venue is required'),
    description: z.string().min(10, 'Description must be at least 10 characters long!').max(250, 'Description is too long!'),
    date: z.iso.date('Date is required'),
    slug: z.string().min(1, 'Slug is required!'),
})