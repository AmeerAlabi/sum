"use client";

import { useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { Summary } from "./components/Summary";
import { jsPDF } from "jspdf";
import { BiLoader, BiLoaderCircle } from "react-icons/bi";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [keyPoints, setKeyPoints] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wordLimit, setWordLimit] = useState(1000);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("wordLimit", wordLimit.toString());

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setSummary(formatText(data.summary));
      setKeyPoints(data.keyPoints || []);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message || "Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text) => {
    return text.replace(/\n/g, "\n\n"); // Ensuring paragraph breaks
  };
  const handleDownloadPDF = () => {
    if (!summary) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("PDF Summary", 10, 10);
    doc.setFontSize(12);
    
    const splitSummary = doc.splitTextToSize(summary, 180);
    doc.text(splitSummary, 10, 20);

    if (keyPoints && keyPoints.length > 0) {
      doc.text("\nKey Points:", 10, doc.lastAutoTable?.finalY + 10 || 40);
      keyPoints.forEach((point, index) => {
        doc.text(`- ${point}`, 10, (doc.lastAutoTable?.finalY || 50) + (index + 1) * 10);
      });
    }

    doc.save("summary.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          PDF Summarizer
        </h1>

        <div className="mb-4">
          <label className="text-gray-700">Select Word Limit:</label>
          <div className="flex gap-4 mt-2">
            {[500, 1000, 3000, 5000].map((limit) => (
              <label key={limit} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="wordLimit"
                  value={limit}
                  checked={wordLimit === limit}
                  onChange={() => setWordLimit(limit)}
                />
                {limit} 
              </label>
            ))}
          </div>
        </div>
        <FileUploader onFileUpload={handleFileUpload} isLoading={isLoading} />

        {isLoading && <BiLoader />} 

        {error && (
          <div className="mt-4 text-red-600 text-center bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        {summary && keyPoints && (
          <>
            <Summary summary={summary} keyPoints={keyPoints} onDownload={handleDownloadPDF} />
            <button
              onClick={handleDownloadPDF}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition"
            >
              Download as PdF
            </button>
          </>
        )}
      </div>
    </div>
  );
}