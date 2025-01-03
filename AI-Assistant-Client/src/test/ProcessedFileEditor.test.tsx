import { render } from '@testing-library/react';
import { ProcessedFileEditor } from '../library/components/ProcessedFileEditor';
import SuggestionSystem from '../library/components/CustomEditor';
import { describe, it, expect, vi } from 'vitest';
import { ErrorData } from '../types/propTypes';

vi.mock('../library/components/CustomEditor', () => ({
    default: vi.fn(() => null),
}));

describe('ProcessedFileEditor', () => {
    it('should render SuggestionSystem with provided props', () => {
        const mockProcessedFile = 'Test sentence';
        const mockErrorData: ErrorData[] = [{error: 'Test error', position: { start: 0, end: 5 }, sentence: 'Test sentence', suggestions: ['suggestion 1', 'suggestion 2'] }];
        const mockFileType = 'txt';

        render(
            <ProcessedFileEditor
                content={mockProcessedFile}
                errorData={mockErrorData}
                fileType={mockFileType}
            />
        );

        expect(SuggestionSystem).toHaveBeenCalledWith(
            expect.objectContaining({
                content: mockProcessedFile,
                errorData: mockErrorData,
                fileType: mockFileType,
            }),
            {}
        );
    });

});