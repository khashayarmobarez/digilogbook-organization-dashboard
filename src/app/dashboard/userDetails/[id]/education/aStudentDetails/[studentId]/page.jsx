'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserDetails = ({ params }) => {
  const router = useRouter();
  const { id, studentId } = params;

  useEffect(() => {
    // Redirect the user to the desired URL
    if (id) {
      router.replace(`/dashboard/userDetails/${id}/education/aStudentDetails/${studentId}/practical`);
    }
  }, [id, studentId, router]);

  return null; // No need to render anything since we are redirecting
};

export default UserDetails;