'use client'
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Image from "next/image";

import { ImageIcon } from "lucide-react";
import { convertFileToUrl } from "@/utils/constant";

const ImageUploader = ({ fieldChange, mediaUrl }:{fieldChange:any; mediaUrl?:string|null}) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles:any) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [fieldChange] // Remove 'file' from dependency array
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"]
    }
  });

  return (
    <div
      {...getRootProps()}
      className="flex w-full justify-center items-center flex-col rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className={`flex  items-center justify-center w-full`}>
              <Image src={fileUrl} alt="media" className={`object-contain`} width={200} height={200} />
          </div>
          <p className="">Click or drag to replace cover image</p>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center flex-col">
          <ImageIcon size={100}  />
          <p className="">Drag &apos;n&apos; drop cover image </p>

        </div>
      )}
    </div>
  );
};

export default ImageUploader;
