import UploadBackup from "./components/UploadBackup";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">PostgreSQL Backup Restorer</h1>
      <UploadBackup />
    </main>
  );
}
