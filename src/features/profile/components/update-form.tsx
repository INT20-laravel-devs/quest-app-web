'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UpdateFormInputs, updateSchema } from './update-form-schema';
import ImageUpload from '@/components/image-upload';
import useAuthStore from '@/store/use-auth-store';
import { useEffect } from 'react';
import { updateAvatar, updateProfile } from '@/api/user';
import { toast } from 'sonner';

async function createFileFromUrl(
  url: string,
  fileName: string,
  mimeType: string,
): Promise<File> {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], fileName, { type: mimeType });
}

const UpdateForm = () => {
  const user = useAuthStore((state) => state.user);
  const form = useForm<UpdateFormInputs>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      nickname: user?.nickname,
    },
  });

  useEffect(() => {
    if (!user?.avatarLink) return;

    createFileFromUrl(user?.avatarLink, 'avatar.png', 'image/png').then(
      (file) => {
        form.setValue('profileImage', file);
      },
    );
  }, [user]);

  async function onSubmit(values: UpdateFormInputs) {
    try {
      const formData = new FormData();
      await updateProfile(user?.id as string, values.nickname);

      if (values.profileImage) {
        formData.append('file', values.profileImage);
        await updateAvatar(formData);
      }
      toast.success('Profile updated successfully');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container space-y-8"
      >
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <ImageUpload
              onChange={(file) => field.onChange(file)}
              imageLink={user?.avatarLink}
            />
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nickname" {...field} />
              </FormControl>
              <FormDescription>Choose a unique username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting}
        >
          Update Details
        </Button>
      </form>
    </Form>
  );
};

export default UpdateForm;
