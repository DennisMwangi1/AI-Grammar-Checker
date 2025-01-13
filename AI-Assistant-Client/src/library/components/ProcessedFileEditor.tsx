import { SuggestionSystemProps } from '../../types/propTypes';
import SuggestionSystem from './CustomEditor';

/**
 * ProcessedFileEditor component. This component takes in the processedFile string, errorData array, and fileType string, and renders a div with a SuggestionSystem component inside of it.
 * @param {{ processedFile: string, errorData: any[], fileType: string }} props
 * @returns {JSX.Element}
 */
export const ProcessedFileEditor = ({ content, errorData, fileType }: SuggestionSystemProps) => {
    return (
        content && errorData && fileType ? (
            <div className="overflow-auto border text-black bg-white ">
                {/* TODO: This is a template implementation */}
                {/*<SuggestionSystem content={content} errorData={errorData} fileType={fileType} />*/}
                
                <RichTextEditorWithSuggestions content={content} errorData={errorData} fileType={fileType} />
            </div>
        ) : (
                <div className="flex items-center justify-center h-full text-center text-red-500">
                    <p>No file provided. Please upload a file to proceed.</p>
                </div>
        )
    );
};
