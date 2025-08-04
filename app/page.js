import Link from "next/link";
import EventCard from "@/components/EventCard";

async function getEvents() {
  // When fetching on the server, we need to provide the full URL.
  // We'll use an environment variable for this.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
    cache: "no-store", // This ensures we get fresh data on every request.
  });

  if (!res.ok) {
    // This will provide more specific error information in your server console.
    const errorBody = await res.text();
    console.error(`API Error: ${res.status} ${res.statusText}`, errorBody);
    // This will be caught by the Error Boundary
    throw new Error(`Failed to fetch events. Status: ${res.status}`);
  }

  return res.json();
}

export default async function HomePage() {
  const { data: events } = await getEvents();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <Link
            href="/add-event"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Event
          </Link>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <p className="text-center text-gray-500">
              No events found. Add one!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
