import { Schema, models, model } from 'mongoose';

const venueSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Missing Name',
    },
    address: {
        type: String,
        required: 'Missing address'
    },
    state: {
        type: String,
        required: 'Missing state'
    }
})

export default models.Venue || model('Venue', venueSchema)