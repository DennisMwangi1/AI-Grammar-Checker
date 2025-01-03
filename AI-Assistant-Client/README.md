React Application with File Processing and Grammar Check
========================================================

This is a React-based web application that allows users to upload documents for grammar checking and processing. The application supports various document types including plain text, PDF, and DOCX files.

Features
--------

* **File Upload**: Users can drag and drop or select files for processing.

* **File Type Support**: The app supports plain text files, PDFs, and DOCX files.

* **Grammar Check**: After processing the file, the app sends the content for grammar checking.

* **Error Handling**: Displays an error modal in case of errors during file processing or grammar checking.

* **Loading State**: A loader is displayed during file processing and grammar checking.

File Handling Logic
-------------------

The app handles the following file types:

* **Plain Text (.txt)**: Processes the file and sends the content for grammar checking.

* **PDF (.pdf)**: Displays the PDF file and sends its content for grammar checking.

* **DOCX (.docx)**: Processes the DOCX file and sends its content for grammar checking.

### Supported Actions

* **Handle File**: When a file is dropped or selected, the app processes it based on its type.

* **Grammar Check**: Once the file is processed, the app sends its content to a backend server for grammar checking. The backend API checks for any grammar issues and returns suggestions.

Key Components
--------------

### App

This is the main component that holds the logic for file processing, error handling, and rendering the UI.

* **State Variables**:

  * file: Stores the uploaded file.

  * pdfUrl: Stores the URL for the PDF preview.

  * contentType: Stores the processed content type.

  * processedFile: Stores the processed content after file handling.

  * errorData: Stores the grammar check results.

  * loading: A boolean state to indicate if the file is being processed.

  * fetchError: A boolean state to handle errors during the fetch request.

  * fetchErrorMessage: Stores the error message in case of a failure.

  * isModalOpen: Boolean state to manage the visibility of the error modal.

### handleFile

This function processes the uploaded file based on its type:

* For text files, it calls preProcessTXTFile.

* For DOCX files, it calls preProcessDOCXFile.

* For PDF files, it generates a URL for the PDF preview.

After processing, the file is sent to the backend for grammar checking.

### grammarCheck

This function is responsible for making a POST request to the backend server for grammar checking. It sends the processed file content and receives grammar check results (error data).

### showToast

Displays an error toast message at the bottom right of the screen. The toast will automatically close after a set duration.

### ErrorModal

The modal component displays errors that may occur during file processing or grammar checking.

### Loader

A loading spinner is displayed while the app processes the file or performs the grammar check.

### FileDropzone

A drag-and-drop zone for file uploads. Users can also select files via a file dialog. The component calls the handleFile function when a file is dropped or selected.

### DocumentViewer

Renders the uploaded PDF or DOCX file. It uses the contentType and file props to render the file accordingly.

### ProcessedFileEditor

Displays the processed content of the uploaded file alongside any grammar errors and suggestions.

Dependencies
------------

* **React**: The JavaScript library for building user interfaces.

* **axios**: A promise-based HTTP client for making requests to the backend.

* **react-toastify**: A library for displaying toast notifications.

* **Tailwind CSS**: A utility-first CSS framework for styling the app.

* **ErrorModal** and **Loader** components: Custom components for displaying errors and loading states.

Installation
------------

1. git clone  [<https://github.com/DennisMwangi1/AI-Grammar-Checker>](https://github.com/DennisMwangi1/AI-Grammar-Checker)

2. cd AI-Assistant-Server

3. npm install

4. npm run dev. The app will run on <http://localhost:5173> by default.

Environment Setup
-----------------

Make sure the backend server is running to process the grammar check requests. The backend API should be accessible at <http://localhost:3000/grammarCheck>.

Contributing
------------

Feel free to fork the repository, contribute to the code, or open issues for any bugs or feature requests.

License
-------

This project is licensed under the MIT License.

This markdown version of the README provides an overview of the application, its key components, and setup instructions in a clean, rich text format.
