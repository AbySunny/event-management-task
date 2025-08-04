'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ eventId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Failed to delete event');
        }

        router.push('/');
        router.refresh();
      } catch (error) {
        console.error(error);
        alert('Error deleting event.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
    >
      {isDeleting ? 'Deleting...' : 'Delete Event'}
    </button>
  );
}