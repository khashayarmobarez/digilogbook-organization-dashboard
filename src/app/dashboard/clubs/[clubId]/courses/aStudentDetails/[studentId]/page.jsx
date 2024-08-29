'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserDetails = ({ params }) => {
  const router = useRouter();
  const { clubId, studentId } = params;

  useEffect(() => {
    // Redirect the user to the desired URL
    if (clubId) {
      router.replace(`/dashboard/userDetails/${clubId}/education/aStudentDetails/${studentId}/practical`);
    }
  }, [clubId, studentId, router]);

  return null; // No need to render anything since we are redirecting
};

export default UserDetails;