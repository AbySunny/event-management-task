import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Find all events and sort them by creation date in descending order
    const events = await Event.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // We get the form data from the request.
    const data = await request.json();

    // Connect to the database.
    await dbConnect();

    // Create a new event using our Mongoose model.
    const event = await Event.create(data);

    // If the event is created successfully, we send back a success response.
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    // If there's an error, we log it and send back an error response.
    console.error("Error creating event:", error);

    // Mongoose validation errors have a specific structure
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return NextResponse.json(
        { success: false, errors: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
