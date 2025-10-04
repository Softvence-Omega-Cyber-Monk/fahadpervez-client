"use client"

import type React from "react"

import { Upload } from "lucide-react"
import { useState } from "react"
import PrimaryButton from "@/common/PrimaryButton"

export default function UploadProductFile() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  return (
    <div className="">
              <h2 className="text-dark-blue font-semibold text-xl mb-6">Upload Your Product File</h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-light-background rounded-lg py-16 text-center transition-colors ${
          isDragging ? "border-primary-blue bg-primary-blue/5" : "border-border bg-white"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-light-gray" />
          </div>

          <div>
            <h3 className="mb-1">Drag and drop your file here</h3>
            <p className="p2">or click to browse and select a file</p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-light-gray text-xs font-medium rounded">Excel (.xlsx)</span>
            <span className="px-3 py-1 bg-gray-100 text-light-gray text-xs font-medium rounded">CSV (.csv)</span>
          </div>

          <p className="p2 ">Maximum file size: 10MB</p>

          <PrimaryButton type="Primary" title="Browse File" className="px-10"/>
        </div>
      </div>
    </div>
  )
}
