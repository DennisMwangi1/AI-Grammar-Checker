import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Node, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { ErrorData, SuggestionSystemProps } from '../../types/propTypes';
import { saveDocument } from '../util/saveDocument';
import axios from 'axios';
import { useDebounce } from "use-debounce";
import { normalizeText } from '../util/normalizeText';

/**
 * RichTextEditorWithSuggestions Component
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.content - Initial content for the editor.
 * @param {ErrorData[]} props.errorData - Array of grammar error objects.
 * @param {string} props.fileType - File type for saving the document.
 * @returns {JSX.Element} A rich text editor with grammar checking and suggestions.
 */

const RichTextEditorWithSuggestions: React.FC<SuggestionSystemProps> = ({ content, errorData: initialErrorData, fileType }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const initialValue = useMemo(
    () => [{ type: "paragraph", children: [{ text: content }] }],
    [content]
  );

  const [value, setValue] = useState<Node[]>(initialValue);
  const [errorData, setErrorData] = useState<ErrorData[]>(initialErrorData);
  const [activeErrorIndex, setActiveErrorIndex] = useState<number | null>(null);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [debouncedValue] = useDebounce(value as any, 500);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const text = debouncedValue[0].children[0].text;
    /**
 * Handles grammar checks and updates the error data.
 * @function grammarCheck
 * @returns {Promise<void>} Updates error data based on the server response.
 */
    const grammarCheck = async () => {
      setIsUpdating(true);

      try {
        const response = await axios.post(`${baseUrl}/grammarCheck`, {
          value: text,
        });
        if (response.status === 200) {
          setErrorData(response.data);
          setIsUpdating(false);
        }
      } catch (error) {
        console.error("Error during grammar check:", error);
      }
    };
    if (text) {
      grammarCheck();
    }
  }, [debouncedValue, baseUrl]);

  useEffect(() => {
    setDisableSaveButton(errorData.length > 0);
  }, [errorData]);

  /**
   * Decorates error ranges in the editor.
   * @function decorate
   * @param {[Node, Path]} param0 - Slate node and path.
   * @returns {Array} Ranges to decorate with error highlights.
   */
  const decorate = useCallback(
    ([node, path]: any) => {
      const ranges: any[] = [];
      if (node.text) {
        errorData.forEach(({ position: { start, end } }, index) => {
          if (start < node.text.length && end <= node.text.length) {
            ranges.push({
              anchor: { path, offset: start },
              focus: { path, offset: end },
              error: true,
              errorIndex: index,
            });
          }
        });
      }
      return ranges;
    },
    [errorData]
  );

  /**
 * Renders custom leaf elements in the editor.
 * @function renderLeaf
 * @param {Object} props - Props for the leaf element.
 * @param {Object} props.attributes - Attributes for the element.
 * @param {React.ReactNode} props.children - Child elements of the leaf.
 * @param {Object} props.leaf - The leaf object containing error data.
 * @returns {JSX.Element} Rendered leaf element with error highlights.
 */
  const renderLeaf = useCallback(({ attributes, children, leaf }: any) => {
    if (leaf.error) {
      return (
        <span
          {...attributes}
          style={{ backgroundColor: "rgba(255, 0, 0, 0.3)", cursor: "pointer" }}
          onClick={() => setActiveErrorIndex(leaf.errorIndex)}
          role='button'
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setActiveErrorIndex(leaf.errorIndex);
            }
          }}
          onTouchEnd={() => setActiveErrorIndex(leaf.errorIndex)}
        >
          {children}
        </span>
      );
    }
    return <span {...attributes}>{children}</span>;
  }, []);

/**
 * Accepts a suggestion for the currently active error index, replacing
 * the erroneous text in the editor with the provided suggestion. Updates
 * the error data to remove the resolved error and adjusts the positions
 * of subsequent errors. Resets the active error index to null.
 * 
 * @param {string} suggestion - The text to replace the error with.
 */
  const handleAcceptSuggestion = (suggestion: string) => {
    if (activeErrorIndex === null) return;

    const { position: { start, end } } = errorData[activeErrorIndex];
    const lengthDifference = suggestion.length - (end - start);

    const path = [0, 0];
    const range = {
      anchor: { path, offset: start },
      focus: { path, offset: end },
    };

    Transforms.delete(editor, { at: range });
    Transforms.insertText(editor, suggestion, { at: range.anchor });

    setErrorData((prevErrorData) => {
      return prevErrorData
        .filter((_, index) => index !== activeErrorIndex)
        .map((error, index) => {
          if (index > activeErrorIndex) {
            return {
              ...error,
              position: {
                start: error.position.start + lengthDifference,
                end: error.position.end + lengthDifference,
              },
            };
          }
          return error;
        });
    });

    setActiveErrorIndex(null);
  };

  /**
   * Handles the rejection of a suggestion by removing the error from the error data state
   * and resetting the active error index to null.
   */
  const handleRejectSuggestion = () => {
    if (activeErrorIndex === null) return;
    setErrorData((prev) => prev.filter((_, index) => index !== activeErrorIndex));
    setActiveErrorIndex(null);
  };

  /**
   * Handles the saving of a document by calling the saveDocument function
   * and setting the isSaving state to true and false accordingly.
   * @param {Object} value - The editor value containing the document text.
   * @param {string} fileType - The file type to save the document as.
   */
  const handleSaveDocument = (value: any, fileType: string) => {
    const text = value[0].children[0].text || "";
    const normalizedText = normalizeText(text);
    saveDocument(normalizedText, fileType).then(() => {
    });
  };

  /**
   * Renders a modal dialog with suggestions for the currently active error
   * index. The modal is hidden when there is no active error index.
   * @returns {JSX.Element} The rendered modal element.
   */
  const renderModal = () => {
    if (activeErrorIndex === null) return null;

    const { error, suggestions } = errorData[activeErrorIndex];
    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 text-black"
        role="dialog"
        aria-labelledby="suggestions-modal"
        aria-hidden={activeErrorIndex === null ? 'true' : 'false'}
      >
        <div className="bg-white p-6 rounded-lg w-96 max-w-full shadow-lg">
          <strong className="block mb-4 text-xs font-semibold italic" id="suggestions-modal">{error}</strong>
          <ul className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <li key={suggestion + i} className="flex items-center justify-between">
                <span>{suggestion}</span>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => handleAcceptSuggestion(suggestion)}
                    className="bg-blue-500 text-white px-4 py-1 text-xs rounded hover:bg-blue-600 transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleRejectSuggestion}
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
    <div className="p-6 relative">
      {isUpdating && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          aria-labelledby="updating-modal-title"
          aria-hidden={!isUpdating}
        >
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 id="updating-modal-title" className="text-lg font-bold mb-4">
              Updating...
            </h2>
            <p>Please wait while the document is being updated.</p>
          </div>
        </div>
      )}
      <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-2 border-gray-300 pb-2">
        Document Content with Errors
      </h3>
      <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
        <Editable className="pb-20 p-2" decorate={decorate} renderLeaf={renderLeaf} />
      </Slate>
      {renderModal()}
      <div className="flex justify-between place-items-center mt-20">
        <div className="relative inline-block mt-4">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleSaveDocument(value, fileType)}
            className={`${disableSaveButton
              ? "bg-gray-400 font-bold py-2 px-4 rounded cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              }`}
            disabled={disableSaveButton}
          >
            Save Document
          </button>
          {disableSaveButton && isHovered && (
            <div className="absolute bottom-full mb-2 w-32 text-center p-2 bg-black text-white text-xs rounded">
              Please fix all errors
            </div>
          )}
        </div>
        <button className="inline-block">
          <a href="/" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            Back to Homepage
          </a>
        </button>
      </div>
    </div>
  );
};

export default RichTextEditorWithSuggestions;
