import ApproveEmailCard from '@/features/auth/components/approve-email-card';
import { Suspense } from 'react';

const ApproveEmail = () => {
  return (
    <Suspense>
      <ApproveEmailCard />
    </Suspense>
  );
};

export default ApproveEmail;
