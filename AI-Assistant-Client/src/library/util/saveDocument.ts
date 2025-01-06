import ConvertApi from "convertapi-js";

export const saveDocument = async (
  documentContent: string,
  fileType: string
) => {
  console.log(documentContent, fileType);
  try {
    const convertApiKey = import.meta.env.VITE_CONVERT_API_KEY; // Store your ConvertAPI key
    const convertApi = ConvertApi.auth(convertApiKey || "");
    const params = convertApi.createParams();
    const file = new File([documentContent], "document.html", {
      type: "text/html",
    });

    params.add("File", file);

    let result;

    // Handle different file types
    switch (fileType) {
      case "application/pdf":
        // Convert HTML content to PDF
        result = await convertApi.convert("html", "pdf", params);
        break;

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        // Convert HTML content to DOCX
        result = await convertApi.convert("html", "docx", params);
        break;

      case "text/plain": {
        // For plain text, no need for conversion
        const blob = new Blob([documentContent], {
          type: "text/plain",
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "document.txt";
        link.click();
        console.log("Plain text document saved.");
        return;
      }

      default:
        console.error("Unsupported file type.");
        return;
    }
    console.log(result);
    const downloadUrl = result.files[0].Url;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `converted_document.${
      fileType === "application/pdf" ? "pdf" : "docx"
    }`;
    link.click();
  } catch (error) {
    console.error("Error saving document:", error);
  }
};
