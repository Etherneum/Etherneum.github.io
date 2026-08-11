import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <p className="mb-4">Hidden admin tools. Keep this URL secret.</p>
      <div className="flex flex-col gap-3">
        <Link href="/admin/secret" className="px-4 py-2 bg-gray-800 text-white rounded">Combined Export / Copy</Link>
        <Link href="/admin/secret-tierlist" className="px-4 py-2 bg-indigo-600 text-white rounded">Edit Tierlists (JSON)</Link>
        <Link href="/admin/secret-values" className="px-4 py-2 bg-green-600 text-white rounded">Edit Value List (JSON)</Link>
      </div>
    </div>
  );
}
