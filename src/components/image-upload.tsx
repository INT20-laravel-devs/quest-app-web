'use client';

import type React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

interface ImageUploadProps {
  onChange: (file: File) => void;
  imageLink?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, imageLink }) => {
  const [preview, setPreview] = useState<string | null>(imageLink || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
    },
    maxFiles: 1,
  });

  return (
    <FormItem>
      <FormLabel>Profile Image</FormLabel>
      <FormControl>
        <div
          {...getRootProps()}
          className={`border-2 mx-auto aspect-square w-28 rounded-full border-dashed p-4 text-center cursor-pointer ${
            isDragActive ? 'border-primary' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Selected"
              className="w-full h-full object-cover rounded-full"
            />
          ) : isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drop or select one</p>
          )}
        </div>
      </FormControl>
    </FormItem>
  );
};

export default ImageUpload;
