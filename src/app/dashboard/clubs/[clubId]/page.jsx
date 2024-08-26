'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ClubDetails = ({ params }) => {
  const router = useRouter();
  const { clubId } = params;

  useEffect(() => {
    // Redirect the user to the desired URL
    if (clubId) {
      router.replace(`/dashboard/clubs/${clubId}/coaches`);
    }
  }, [clubId, router]);

  return null; // No need to render anything since we are redirecting
};

export default ClubDetails;