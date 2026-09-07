import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { Testimonial } from '../../types';
import { uid } from '../../lib/storage';

const blank = (): Testimonial => ({
  id: uid('rev'),
  name: '',
  text: '',
  rating: 5,
  date: 'Google review',
  source: 'Google',
  featured: true,
  visible: true,
});

const AdminTestimonials: React.FC = () => {
  const { testimonials, upsertTestimonial, deleteTestimonial } = useStudio();
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.name.trim() || !editing.text.trim()) return;
    upsertTestimonial(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Testimonials</h1>
          <p className="mt-1 text-sm text-nala-muted">Add, edit, feature or hide reviews</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setEditing(blank())}>
          Add review
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <article key={item.id} className="rounded-md border border-nala-border bg-nala-ivory p-5">
            <p className="font-display text-xl leading-relaxed">“{item.text}”</p>
            <p className="mt-3 text-sm font-medium">{item.name}</p>
            <p className="text-sm text-nala-muted">
              {item.rating}/5 · {item.source} · {item.date}
              {!item.visible ? ' · Hidden' : ''}
              {item.featured ? ' · Featured' : ''}
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-secondary !py-2" onClick={() => setEditing(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn-ghost text-red-700"
                onClick={() => confirm('Delete review?') && deleteTestimonial(item.id)}
              >
                Delete
              </button>
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
            <h2 className="mb-4 font-display text-2xl">Review</h2>
            <div className="space-y-3">
              <div>
                <label className="label-nala">Name</label>
                <input
                  className="input-nala"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label-nala">Review text</label>
                <textarea
                  className="input-nala min-h-[110px]"
                  value={editing.text}
                  onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-nala">Rating</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="input-nala"
                    value={editing.rating}
                    onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="label-nala">Date label</label>
                  <input
                    className="input-nala"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label-nala">Source</label>
                <input
                  className="input-nala"
                  value={editing.source || ''}
                  onChange={(e) => setEditing({ ...editing, source: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.visible}
                  onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                />
                Visible
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
