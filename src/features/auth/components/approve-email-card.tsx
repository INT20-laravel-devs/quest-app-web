'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/constants/routes';
import { cn } from '@/utils/styles-utils';
import { useQueryState } from 'nuqs';
import { emailApprove, emailResend } from '@/api/auth';
import { toast } from 'sonner';

const ApproveEmailCard = () => {
  const [token] = useQueryState('token');
  const [email] = useQueryState('email');
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>(
    'loading',
  );

  const handleApprove = async () => {
    if (!token) return;
    try {
      await emailApprove(token);
      setStatus('success');
      toast.success('Email approved successfully!');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      setStatus('failure');
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await emailResend({ email: email });
      toast.success('Email sent successfully!');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    handleApprove();
  }, [token]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Email Approval</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {status === 'loading' && (
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        )}
        {status === 'success' && (
          <>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-md font-semibold">
                Email approved successfully!
              </span>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'mt-4',
              )}
              href={Routes.SIGN_IN}
            >
              Go to login
            </Link>
          </>
        )}
        {status === 'failure' && (
          <>
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <XCircle className="h-6 w-6" />
              <span className="text-md font-semibold">
                Failed to approve email.
              </span>
            </div>
            <Button
              onClick={handleResend}
              variant="outline"
              size="lg"
              className="mt-4"
            >
              Try again
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ApproveEmailCard;
