"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export const FileUploader = ({ onFileUpload, isLoading }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
        isDragActive ? "border-purple-400 bg-purple-100" : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
      }`}
    >
      <input {...getInputProps()} />
      <FiUploadCloud className="mx-auto text-5xl text-purple-500 mb-4" />
      {isLoading ? (
        <p className="text-gray-600 animate-pulse">Processing your PDF...</p>
      ) : isDragActive ? (
        <p className="text-purple-600 font-semibold">Drop your PDF here!</p>
      ) : (
        <p className="text-gray-600">Drag & drop your PDF here, or click to select one</p>
      )}
    </div>
  )
}

