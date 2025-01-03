/**
 * A component that displays a document within a webpage.
 * If the content type is "PDF", the document is displayed in an iframe.
 * Otherwise, the document is displayed in a div with the document content as its innerHTML.
 * @param {string} contentType - The type of the document (e.g. "PDF", "text/plain", "application/msword")
 * @param {File} file - The document file to display
 * @param {string} pdfUrl - The URL of the PDF document (only required if contentType is "PDF")
 * @returns {JSX.Element} The DocumentViewer component
 */
export const DocumentViewer = ({ contentType, file, pdfUrl }: any) => {
    return contentType === "PDF" ? (
        <iframe
            title={file.name}
            src={`${pdfUrl}#zoom=page-fit`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
        />
    ) : (
            <div className="overflow-auto border text-black bg-white p-10">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-2 border-gray-300 pb-2">
                    Original Version of {file.name}
                </h3>
            <div dangerouslySetInnerHTML={{ __html: contentType || "" }} />
        </div>
    );
};