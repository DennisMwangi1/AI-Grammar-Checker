import { ErrorModalProps } from '../../../types/propTypes';


/**
 * A modal that displays an error message and a close button.
 * The modal is overlayed on the page and centered.
 * If the modal is not open, then nothing is rendered.
 *
 * @param {{ isOpen: boolean, errorMessage: string | null, onClose: () => void }} props
 * @returns {React.ReactElement}
 */

const ErrorModal = ({ isOpen, errorMessage, onClose }: ErrorModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-red-600">Error</h2>
                <p className="text-gray-700 mb-4">{errorMessage ?? "An unknown error occurred."}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
