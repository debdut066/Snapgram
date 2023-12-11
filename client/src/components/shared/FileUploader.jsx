import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { convertFileToUrl } from "../../lib/utils";

export default function FileUploader({ fieldChange, mediaUrl }){
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback((acceptedFiles)=>{
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]))
    },[])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div 
            {...getRootProps()}
            className="flex flex-1 flex-col bg-dark-3 rounded-xl cursor-pointer"
        >
            <Input {...getInputProps()}  className="cursor-pointer bg-transparent border-0"/>
            { fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className="file_uploader-img" />
                    </div>
                    <p className="file_uploader-label">Click or drag photo to replace</p>
                </>
            ) : (
            <div className="file_uploader-box">
                <img
                    src="../../../public/images/file-upload.svg"
                    width={96}
                    height={77}
                    alt="file upload"
                />
                <h3 className="base-medium text-light-2 mb-2 mt-6">
                    Drag photo here
                </h3>
                <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
                <Button type="button" className="shad-button_dark_4">
                    Select the picture
                </Button>
                </div>
            )}
        </div>
    )
}

// FileUploader.propTypes = {
//     fieldChange : PropTypes.func,
//     mediaUrl : PropTypes.string,
// }