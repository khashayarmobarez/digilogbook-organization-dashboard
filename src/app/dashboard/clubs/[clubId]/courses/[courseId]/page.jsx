'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserDetails = ({ params }) => {
  const router = useRouter();
  const { clubId, courseId } = params;

  useEffect(() => {
    // Redirect the user to the desired URL
    if (id) {
      router.replace(`/dashboard/clubs/${clubId}/courses/${courseId}/students`);
    }
  }, [id, courseId, router]);

  return null; // No need to render anything since we are redirecting
};

export default UserDetails;