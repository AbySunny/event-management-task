import dbConnect from '@/lib/dbConnect';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request, { params: { id } }) {

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
    console.error(`Error fetching event ${id}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params: { id } }) {

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: 'Invalid event ID' }, { status: 400 });
  }

  try {
    const data = await request.json();
    await dbConnect();

    const event = await Event.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return NextResponse.json({ success: false, errors: errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, error: 'Invalid event ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    // Return a 204 No Content response on successful deletion, which is a
    // standard practice for successful DELETE requests.
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}