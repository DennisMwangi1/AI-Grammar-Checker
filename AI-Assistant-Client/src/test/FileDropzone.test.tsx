import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FileDropzone } from "../library/components/FileDropzone";

describe("FileDropzone Component", () => {
    let mockOnDrop: (file: File) => void;

    beforeEach(() => {
        mockOnDrop = vi.fn();
    });

    test("calls onDrop when a file is dropped", async () => {
        render(<FileDropzone onDrop={mockOnDrop} />);

        const dropzone = screen.getByTestId("dropzone");

        // Create a mock file
        const file = new File(["file contents"], "test.txt", { type: "text/plain" });

        // Wrap the drop event in `act`
        await act(async () => {
            fireEvent.drop(dropzone, {
                dataTransfer: {
                    files: [file],
                    types: ["Files"],
                },
            });
        });

        expect(mockOnDrop).toHaveBeenCalledTimes(1);
        expect(mockOnDrop).toHaveBeenCalledWith(file);
    });

    test("applies active styling when a file is dragged over", () => {
        render(<FileDropzone onDrop={mockOnDrop} />);

        const dropzone = screen.getByTestId("dropzone");

        // Wrap the dragOver event in `act`
        act(() => {
            fireEvent.dragOver(dropzone);
        });

        expect(dropzone.parentElement).toHaveClass("hover:border-yellow-500");
    });

    test("removes active styling when a file is dragged out", () => {
        render(<FileDropzone onDrop={mockOnDrop} />);

        const dropzone = screen.getByTestId("dropzone");

        // Wrap the dragOver and dragLeave events in `act`
        act(() => {
            fireEvent.dragOver(dropzone);
            fireEvent.dragLeave(dropzone);
        });

        expect(dropzone.parentElement).not.toHaveClass("bg-yellow-50");
    });
});
