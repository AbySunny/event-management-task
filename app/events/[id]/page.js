import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/events";

export default async function EventDetailsPage({ params: { id } }) {
  const result = await getEvent(id);

  if (!result || !result.data) {
    notFound();
  }

  const { data: event } = result;

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-900 mb-4 block"
          >
            &larr; All Events
          </Link>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative w-full h-96">
            <Image
              src={event.image}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Event Details
              </h2>
              <p className="text-lg text-gray-600">
                <strong>Date:</strong> {eventDate}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                About this event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href={`/events/${event._id}/edit`}
                  className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Event
                </Link>
                <DeleteButton eventId={event._id} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
