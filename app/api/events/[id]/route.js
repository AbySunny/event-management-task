import dbConnect from '@/lib/dbConnect';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  const { id } = params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: 'Invalid event ID format' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Find the event by its ID
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    // Handle potential CastError if the ID format is invalid
    if (error.name === 'CastError') {
        return NextResponse.json({ success: false, error: 'Invalid event ID format' }, { status: 400 });
    }
    console.error(`Error fetching event ${id}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: 'Invalid event ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    // Return a 200 OK with an empty data object on successful deletion
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}