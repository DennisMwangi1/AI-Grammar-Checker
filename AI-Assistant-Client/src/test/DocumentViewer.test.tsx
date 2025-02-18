import { DocumentViewer } from '../library/components/DocumentViewer';
import { render} from "@testing-library/react";
import {  describe, expect, test} from "vitest";


describe("DocumentViewer Component", () => {
    test("renders a PDF iframe when contentType is 'PDF'", () => {
        const props = {
            contentType: "PDF",
            file: { name: "test.pdf" },
            pdfUrl: "http://test.pdf",
        };

        const { container } = render(<DocumentViewer {...props} />);
        const iframe = container.querySelector("iframe");

        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", "http://test.pdf#zoom=page-fit");
        expect(iframe).toHaveAttribute("title", "test.pdf");
    });

    test("renders an empty div when contentType is undefined", () => {
        const props = {
            contentType: undefined,
            file: { name: "test.txt" },
            pdfUrl: "http://test.pdf",
        };

        const { container } = render(<DocumentViewer {...props} />);
        const div = container.querySelector("div");

        expect(div).toBeInTheDocument();
        expect(div).toHaveClass("overflow-auto");
        expect(div?.innerHTML).toBe('<h3 class="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-2 border-gray-300 pb-2">Original Version of test.txt</h3><div></div>');
    });
});