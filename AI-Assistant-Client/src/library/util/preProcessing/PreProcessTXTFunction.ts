export const preProcessTXTFile = async (file: File) => {
    const text = await file.text();
    return (`<pre>${text}</pre>`)
 };