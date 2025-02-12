'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '@/types/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, Upload, X } from 'lucide-react';
import { userUpdate } from '@/api/profile';

interface UpdateFormProps {
  user: User;
  onUpdateSuccess?: () => void;
}

interface FormInputs {
  nickname: string;
  avatar: FileList | null;
}

const UpdateForm: FC<UpdateFormProps> = ({ user, onUpdateSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormInputs>({
    defaultValues: {
      nickname: user.nickname || '',
      avatar: null,
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue('avatar', files);
    }
  };

  const clearFileSelection = () => {
    form.setValue('avatar', null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (values: FormInputs) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Prepare update data
      const updateData: Partial<User> = {
        id: user.id,
        nickname: values.nickname,
      };

      if (values.avatar?.length) {
        const file = values.avatar[0];
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        updateData.avatarLink = base64;
      }

      await userUpdate(updateData as User);
      onUpdateSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Customize your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}

            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatarLink || undefined} />
                  <AvatarFallback>
                    {user.nickname?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {previewUrl && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFileSelection}
                  className="text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove selected image
                </Button>
              </div>
            )}

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your nickname"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Update Profile
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateForm;
