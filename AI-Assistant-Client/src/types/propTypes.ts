
type ErrorData = {
    sentence: string;
    error: string;
    suggestions: string[];
    position: {
        start: number;
        end: number;
    };
};

type SuggestionSystemProps = {
    content: string;
    errorData: ErrorData[];
    fileType: string;
};


type ErrorModalProps = {
    isOpen: boolean;
    errorMessage: string | null;
    onClose: () => void;
};

// Define types for toast
type ToastProps = {
    message: string;
    type: "success" | "error" | "info" | "warning"; // Toast type
    duration: number; // Duration before the toast auto dismisses
    onClose: () => void; // Callback to close the toast
}


type ToastMessage =  {
    id: number;
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration: number;
}


export type {ErrorData, SuggestionSystemProps, ErrorModalProps, ToastProps, ToastMessage};