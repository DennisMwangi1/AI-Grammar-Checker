import React, { useEffect, useState, useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import { saveDocument } from "../util/saveDocument";
import { SuggestionSystemProps, ErrorData } from '../../types/propTypes';

/**
 * SuggestionSystem component allows users to view and interact with errors
 * and suggestions in a document. It provides functionalities to accept or
 * reject suggestions for errors, and updates the document content accordingly.
 * A modal is rendered to show the error message and suggestions when an
 * error is active.
 *
 * @param {SuggestionSystemProps} props - The properties include the initial
 * document content, an array of error data, and the file type.
 * @returns {JSX.Element} The component renders the document content with
 * highlighted errors and a save button. The save button is disabled if there
 * are any unresolved errors.
 */

const SuggestionSystem: React.FC<SuggestionSystemProps> = ({ content, errorData: initialErrorData, fileType }) => {
    const [documentContent, setDocumentContent] = useState(content);
    const [errorData, setErrorData] = useState<ErrorData[]>(initialErrorData);
    const [activeErrorIndex, setActiveErrorIndex] = useState<number | null>(null);
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setDisableSaveButton(errorData.length > 0);
    }, [errorData]);

    const updateContentAndErrors = useCallback(
        (updatedContent: string, updatedErrorData: ErrorData[]) => {
            setDocumentContent(updatedContent);
            setErrorData(updatedErrorData);
        },
        []
    );

    const handleAcceptSuggestion = (suggestion: string, errorIndex: number) => {
        const { start, end } = errorData[errorIndex].position;
        const updatedContent = documentContent.slice(0, start) + suggestion + documentContent.slice(end);
        const updatedErrorData = errorData.filter((_, index) => index !== errorIndex);
        updateContentAndErrors(updatedContent, updatedErrorData);
        setActiveErrorIndex(null);
    };

    const handleRejectSuggestion = (errorIndex: number) => {
        const updatedErrorData = errorData.filter((_, index) => index !== errorIndex);
        setErrorData(updatedErrorData);
        setActiveErrorIndex(null);
    };

    const renderContentWithSuggestions = () => {
        let currentIndex = 0;
        const parts: JSX.Element[] = [];
        const errors = Array.isArray(errorData) ? errorData : [];
        errors.forEach((error, index) => {
            const { start, end } = error.position;

            if (currentIndex < start) {
                const plainText = sanitizeHtml(documentContent.slice(currentIndex, start));
                parts.push(
                    <span
                        key={`text-${currentIndex}`}
                        dangerouslySetInnerHTML={{ __html: plainText }}
                    />
                );
            }

            const errorText = sanitizeHtml(documentContent.slice(start, end));
            parts.push(
                <span
                    key={`error-${index}`}
                    className="border-b-2 border-yellow-700 px-1 rounded cursor-pointer hover:border-red-500 hover:border-2 transition duration-200"
                    dangerouslySetInnerHTML={{ __html: errorText }}
                    onClick={() => setActiveErrorIndex(index)}
                />
            );

            currentIndex = end;
        });
        if (currentIndex < documentContent.length) {
            const remainingText = sanitizeHtml(documentContent.slice(currentIndex));
            parts.push(
                <span
                    key={`text-${currentIndex}`}
                    dangerouslySetInnerHTML={{ __html: remainingText }}
                />
            );
        }

        return parts;
    };

    const renderModal = () => {
        if (activeErrorIndex === null) return null;

        const { error, suggestions } = errorData[activeErrorIndex];
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 text-black">
                <div className="bg-white p-6 rounded-lg w-96 max-w-full shadow-lg">
                    <strong className="block mb-4 text-xs font-semibold italic">{error}</strong>
                    <ul className="space-y-2">
                        {suggestions.map((suggestion, i) => (
                            <li key={suggestion + i} className="flex items-center justify-between">
                                <span>{suggestion}</span>
                                <div className="ml-4 flex space-x-2">
                                    <button
                                        onClick={() => handleAcceptSuggestion(suggestion, activeErrorIndex)}
                                        className="bg-blue-500 text-white px-4 py-1 text-xs rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleRejectSuggestion(activeErrorIndex)}
                                        className="bg-red-500 text-white px-4 py-1 text-xs rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6">
            <div>
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-2 border-gray-300 pb-2">
                    Document Content with Errors
                </h3>
                <div className="space-y-4">{renderContentWithSuggestions()}</div>
            </div>
            {renderModal()}
            <div className='flex justify-between place-items-center'>
            <div className="relative inline-block mt-4">
                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => saveDocument(documentContent, fileType)}
                    className={`${disableSaveButton
                            ? "bg-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed"
                            : "bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                        }`}
                >
                    Save Document
                </button>
                {disableSaveButton && isHovered && (
                    <div className="absolute bottom-full mb-2 w-32 text-center p-2 bg-black text-white text-xs rounded">
                        Please fix all errors
                    </div>
                )}
            </div>
            <button className='inline-block'>
                <a href="/" className="bg-blue-700 hover:bg-blue-900 text-white font-bold  py-2 px-4 rounded">
                    Back to Homepage
                </a>
                </button>
            </div>
        </div>
    );
};

export default SuggestionSystem;
