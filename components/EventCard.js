import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }) {
  // Format the date for better readability
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/events/${event._id}`}
      className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="relative w-full h-48">
        <Image
          src={event.image}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{eventDate}</p>
        <p className="text-sm text-gray-500">{event.location}</p>
      </div>
    </Link>
  );
}
