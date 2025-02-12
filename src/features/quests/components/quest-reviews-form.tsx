import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAuthStore from '@/store/use-auth-store';
import { createComment } from '@/api/comments';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentsResponse } from '@/types/comments';

const commentSchema = z.object({
  grade: z.number().int().min(1).max(5),
  content: z.string().min(1).max(500),
});

type FormValues = z.infer<typeof commentSchema>;

interface QuestReviewsFormProps {
  questId: string;
  reviews: CommentsResponse[];
  setReviews: React.Dispatch<React.SetStateAction<CommentsResponse[]>>;
}

const QuestReviewsForm = ({
  questId,
  reviews,
  setReviews,
}: QuestReviewsFormProps) => {
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      grade: 5,
      content: '',
    },
  });

  const rating = watch('grade');

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await createComment({
        userId: user?.id as string,
        questId,
        ...data,
      });

      setReviews([res, ...reviews]);

      setValue('content', '');
      toast.success('Comment added successfully');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      console.error(e);
    }
  };

  return (
    <form
      className="mb-6 p-2 bg-gray-50 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            className="p-1 h-auto"
            onClick={() => setValue('grade', star)}
            type="button"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          </Button>
        ))}
      </div>
      <Textarea
        placeholder="Leave a comment..."
        className="mb-3"
        error={errors.content?.message}
        {...register('content')}
      />
      <Button isLoading={isSubmitting} type="submit">
        Comment
      </Button>
    </form>
  );
};

export default QuestReviewsForm;
