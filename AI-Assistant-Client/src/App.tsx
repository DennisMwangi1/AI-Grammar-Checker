import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./theme/App.css";
import { preProcessTXTFile } from "./library/util/preProcessing/PreProcessTXTFunction";
import { preProcessDOCXFile } from "./library/util/preProcessing/PreProcessDOCXFunction";
import ErrorModal from "./library/components/helper/ErrorModalComponent";
import Loader from "./library/components/helper/Loader";
import axios from "axios";
import { processFile } from './library/util/ProcessFile';
import Navbar from './library/components/Navbar';
import Footer from './library/components/Footer';
import { FileDropzone } from './library/components/FileDropzone';
import { DocumentViewer } from './library/components/DocumentViewer';
import { ProcessedFileEditor } from './library/components/ProcessedFileEditor';
import { Slide, toast, ToastContainer } from 'react-toastify';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState<any>(null);
  const [processedFile, setProcessedFile] = useState<any>(null);
  const [errorData, setErrorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showToast = (message: string) => {
    toast.error(`${message}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  }

  const handleFile = async (file: File) => {
    if (!file) return;
    setLoading(true);
    setFile(file);

    try {
      const fileType = file.type;
      let result;

      switch (fileType) {
        case "text/plain":
          result = await preProcessTXTFile(file);
          break;

        case "application/pdf":
          result = "PDF";
          setPdfUrl(URL.createObjectURL(file));
          break;

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          result = await preProcessDOCXFile(file);
          break;

        default:
          result = "Unsupported file type";
          break;
      }

      setContentType(result);
      const processedFile = await processFile(file);
      setProcessedFile(processedFile);
    } catch (error) {
      console.log('here');
      setFetchError(true);
      setFetchErrorMessage("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('errorData: ', errorData);
    const grammarCheck = async () => {
      if (processedFile) {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:3000/grammarCheck", {
            value: processedFile,
          });

          if (response.status === 200) {
            setErrorData(response.data);
          } else {
            setFetchError(true);
            setFetchErrorMessage(response.data);
          }
        } catch (error: any) {
          console.log('here it is');
          setFetchError(true);
          setFetchErrorMessage(error.response?.data || "An error occurred during grammar check.");
        } finally {
          setLoading(false);
        }
      }
    };

    grammarCheck();
  }, [processedFile]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFetchError(false);
    setFetchErrorMessage(null);
    setFile(null);
  };

  return (
    <main>
      <Navbar />
      <section className='min-h-screen relative'>
        {!file && !loading && !fetchError && (
          <section className=" grid place-items-center">
            <div className="flex hidden 2xl:flex">
              <img src={viteLogo} className="logo" alt="Vite logo" />
              <img src={reactLogo} className="logo react animate-spin" alt="React logo" />
            </div>
            <section className="text-center">
              <p className="italic my-4">This is a lightweight application that allows you to check the quality of your document effortlessly</p>
            </section>
            <section>
              <FileDropzone onDrop={handleFile} showToast={showToast}/>
            </section>
          </section>
        )}

        {contentType && file && !loading && !fetchError && errorData && (
          <section className="m-10 grid grid-cols-2 gap-10 h-[90vh]">
            <DocumentViewer contentType={contentType} file={file} pdfUrl={pdfUrl} />
            <ProcessedFileEditor
              content={processedFile}
              errorData={errorData}
              fileType={file.type}
            />
          </section>
        )}

        {loading && <Loader />}
        {fetchError && (
          <ErrorModal
            errorMessage={fetchErrorMessage}
            isOpen={fetchError || isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </section>
      <ToastContainer/>
      <Footer />
    </main>
  );
}

export default App;
