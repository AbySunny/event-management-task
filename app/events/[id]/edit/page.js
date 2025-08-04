import Link from 'next/link';
import EventForm from '@/components/EventForm';
import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/events';

export default async function EditEventPage({ params: { id } }) {
  const result = await getEvent(id);

  if (!result || !result.data) {
    notFound();
  }

  const { data: event } = result;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <Link href={`/events/${id}`} className="text-indigo-600 hover:text-indigo-900">
             Back to Event
          </Link>
        </div>
      </header>
      <main className="py-10">
        <EventForm eventToEdit={event} />
      </main>
    </div>
  );
}