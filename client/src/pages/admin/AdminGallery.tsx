import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { GALLERY_CATEGORY_OPTIONS, type GalleryCategory, type GalleryImage } from '../../types';
import { uid } from '../../lib/storage';

const AdminGallery: React.FC = () => {
  const { gallery, upsertGalleryImage, deleteGalleryImage, reorderGallery, uploadImage } =
    useStudio();
  const [editing, setEditing] = useState<GalleryImage | null>(null);

  const move = (id: string, dir: -1 | 1) => {
    const ordered = [...gallery].sort((a, b) => a.order - b.order);
    const idx = ordered.findIndex((g) => g.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= ordered.length) return;
    const ids = ordered.map((g) => g.id);
    [ids[idx], ids[swap]] = [ids[swap], ids[idx]];
    reorderGallery(ids);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.src) return;
    upsertGalleryImage(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Gallery</h1>
          <p className="mt-1 text-sm text-nala-muted">
            Manage images, captions, categories and order
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            setEditing({
              id: uid('gal'),
              src: '',
              caption: '',
              category: 'nails',
              featured: false,
              order: gallery.length + 1,
            })
          }
        >
          Upload image
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...gallery]
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <article key={item.id} className="overflow-hidden rounded-md border border-nala-border bg-nala-ivory">
              <img src={item.src} alt={item.caption} className="aspect-square w-full object-cover" />
              <div className="space-y-2 p-3 text-sm">
                <p className="font-medium">{item.caption || 'Untitled'}</p>
                <p className="text-sm uppercase tracking-[0.12em] text-nala-muted">
                  {item.category}
                  {item.featured ? ' · Featured' : ''}
                </p>
                <div className="flex flex-wrap gap-1">
                  <button type="button" className="btn-ghost !px-2" onClick={() => move(item.id, -1)}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" className="btn-ghost !px-2" onClick={() => move(item.id, 1)}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => setEditing(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-red-700"
                    onClick={() => confirm('Delete image?') && deleteGalleryImage(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-nala-charcoal/40 p-4">
          <form
            onSubmit={save}
            className="w-full max-w-md rounded-md border border-nala-border bg-nala-ivory p-6"
          >
            <h2 className="mb-4 font-display text-2xl">Gallery image</h2>
            <div className="space-y-3">
              <div>
                <label className="label-nala">Upload / Replace</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const src = await uploadImage(file);
                    setEditing({ ...editing, src });
                  }}
                />
                {editing.src && (
                  <img src={editing.src} alt="" className="mt-2 h-40 w-full rounded object-cover" />
                )}
              </div>
              <div>
                <label className="label-nala">Caption</label>
                <input
                  className="input-nala"
                  value={editing.caption}
                  onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
                />
              </div>
              <div>
                <label className="label-nala">Category</label>
                <select
                  className="input-nala"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as GalleryCategory })
                  }
                >
                  {GALLERY_CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Featured
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={!editing.src}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
