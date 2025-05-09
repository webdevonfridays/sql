"use client";

import { useState } from "react";

export default function QueryInterface() {
  const [query, setQuery] = useState("SELECT * FROM pg_catalog.pg_tables;");
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const executeQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Query failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Query Interface</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="textarea textarea-bordered w-full h-32"
        placeholder="Enter your SQL query"
      />
      <button
        onClick={executeQuery}
        className="btn btn-secondary"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? "Executing..." : "Execute Query"}
      </button>

      {error && (
        <div className="alert alert-error mt-4">
          <span>{error}</span>
        </div>
      )}

      {results && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Results ({results.length} rows)</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  {Object.keys(results[0] || {}).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value: any, j) => (
                      <td key={j}>{JSON.stringify(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
