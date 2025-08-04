import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this event."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this event."],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for this event."],
    },
    location: {
      type: String,
      required: [true, "Please provide a location for this event."],
    },
    image: {
      type: String, // We will store the URL to the image
      required: [true, "Please provide an image URL for this event."],
    },
  },
  { timestamps: true }
);

/*
The following line is important!
It prevents Mongoose from recompiling the model every time the file is accessed in development.
If you don't have this, you might see an error like:
"OverwriteModelError: Cannot overwrite `Event` model once compiled."
*/
export default mongoose.models.Event || mongoose.model("Event", EventSchema);
