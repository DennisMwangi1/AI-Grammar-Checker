import { useDropzone } from "react-dropzone";
import dropFile from "../../assets/dropFile.svg";
/**
 * FileDropzone component provides a drag-and-drop interface for uploading files.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onDrop - Callback function to handle the file that is dropped. It receives the first accepted file as an argument.
 *
 * Uses `react-dropzone` to manage file drag-and-drop operations.
 * Accepts single file uploads with allowed file types: .txt, .pdf, .docx.
 * Displays a dashed border and changes background color when a file is dragged over.
 */

export const FileDropzone = ({ onDrop, showToast }: { onDrop: (file: File) => void; showToast?: (message: string) => void }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 1 && showToast) {
                showToast('You can only upload one file at a time.');
            } else if (acceptedFiles.length === 0 && showToast) {
                showToast('No files selected.');
            }
            if (acceptedFiles.length === 1) {
                onDrop(acceptedFiles[0]);
            }
        },
        accept: {
            "text/plain": [".txt"],
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        // maxFiles: 1,
    });

    return (
        <div
            {...getRootProps({
                className: `mt-10 border border-dashed border-gray-400 p-40 hover:border-yellow-500 rounded-xl cursor-pointer ${isDragActive ? "bg-yellow-50" : ""
                    }`,
            })}
        >
            <input {...getInputProps()} id='dropzone' data-testid="dropzone" />
            <img src={dropFile} alt="Drop file here" className="m-auto" />
            <div className="mt-6 sm:mt-10 text-center text-sm sm:text-base md:text-lg">
                <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
            </div>
        </div>
    );
};