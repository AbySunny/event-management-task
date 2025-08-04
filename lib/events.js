import { notFound } from 'next/navigation';

export async function getEvent(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    // This will be caught by the error.js Error Boundary
    throw new Error('Failed to fetch event');
  }

  return res.json();
}