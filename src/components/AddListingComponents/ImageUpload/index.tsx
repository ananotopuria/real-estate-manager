import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";

interface ImageUploadProps {
  setFieldValue: (
    field: string,
    value: File | null,
    shouldValidate?: boolean
  ) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setFieldValue }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFieldValue("image", file);

    // previwe
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setFieldValue("image", null);
    setPreviewImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="mt-[2rem] flex flex-col text-[1.2rem]">
      <label htmlFor="image">ატვირთეთ ფოტო *</label>
      <div
        {...getRootProps()}
        className="border-2 border-dotted border-custom-border rounded-lg p-6 text-center cursor-pointer hover:border-custom-orange mt-2 h-[12rem] flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {previewImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={previewImage}
              alt="Preview"
              className="h-full object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="mt-20 bg-[#fff] text-custom-blue border border-custom-blue rounded-full p-1"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <CiCirclePlus className="text-4xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
