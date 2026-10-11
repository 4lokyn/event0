import { Schema, models, model } from 'mongoose';

const statesSchema = new Schema({
    name: {
        type: String,
        required: 'Name of the state is required!',
        unique: true,
    }
})

export default models.States || model('States', statesSchema)