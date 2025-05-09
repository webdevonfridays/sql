"use client";

import { useState } from "react";

export default function UploadBackup() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsLoading(true);

    try {
      const response = await fetch("/api/restore", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.success ? "Backup restored successfully!" : data.error);
    } catch (error) {
      setMessage("Error uploading file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Upload PostgreSQL Backup</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          name="backup"
          accept=".sql,.dump,.backup,.pgdump"
          className="file-input file-input-bordered w-full max-w-xs"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Processing..." : "Upload & Restore"}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
