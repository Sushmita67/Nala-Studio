import React, { useMemo, useState } from 'react';
import { useStudio } from '../../context/StudioContext';

const AdminMedia: React.FC = () => {
  const { media, uploadImage, deleteMedia } = useStudio();
  const [q, setQ] = useState('');
  const [copied, setCopied] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return media;
    const needle = q.toLowerCase();
    return media.filter((m) => m.name.toLowerCase().includes(needle));
  }, [media, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Media Library</h1>
          <p className="mt-1 text-sm text-nala-muted">Upload, search and reuse images</p>
        </div>
        <label className="btn-primary cursor-pointer">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await uploadImage(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>

      <input
        className="input-nala max-w-md"
        placeholder="Search media…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-md border border-nala-border bg-nala-ivory">
            <img src={item.src} alt={item.name} className="aspect-square w-full object-cover" />
            <div className="space-y-2 p-3 text-sm">
              <p className="truncate font-medium">{item.name}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={async () => {
                    await navigator.clipboard.writeText(item.src);
                    setCopied(item.id);
                    setTimeout(() => setCopied(''), 1500);
                  }}
                >
                  {copied === item.id ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  className="btn-ghost text-red-700"
                  onClick={() => confirm('Delete media?') && deleteMedia(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-nala-muted">No media found. Upload an image to get started.</p>
      )}
    </div>
  );
};

export default AdminMedia;
