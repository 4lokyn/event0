import { Schema, models, model  } from 'mongoose'

const EventsSchema = new Schema({
    name: {
        type: String,
        required: 'Artist name is required',
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: 'Venue',
        required: 'Venue is required!'
    },
    description: {
        type: String,
        required: "Description of event is required!"
    },
    date: {
        type: Date,
        required: 'Date is required',
    },
    slug: {
      type: String,
      unique: true,
      required: 'Slug is required!',
      index: true,
    },

})

export default models.Events || model('Events', EventsSchema)