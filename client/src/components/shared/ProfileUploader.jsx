import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Input } from "../ui/input";

export function ProfileUploader({ fieldChange, mediaUrl }){
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback((acceptedFiles)=>{
        setFile(acceptedFiles)
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]))
    },[file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          "image/*": [".png", ".jpeg", ".jpg"],
        },
    });
    
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className="cursor-pointer" />

            <div className="cursor-pointer flex-start gap-4">
                <img
                    src={fileUrl || "../../../icons/profile-placeholder.svg"}
                    alt="image"
                    className="h-24 w-24 rounded-full object-cover object-top"
                />
                <p className="text-primary-500 small-regular md:bbase-semibold">
                    Change profile photo
                </p>
            </div>
        </div>
    )
}