import Link from 'next/link';
import EventForm from '@/components/EventForm';

export default function AddEventPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-900">
            &larr; Back to Events
          </Link>
        </div>
      </header>
      <main className="py-10">
        <EventForm />
      </main>
    </div>
  );
}
