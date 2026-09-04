import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { Service, ServiceCategory } from '../../types';
import { uid } from '../../lib/storage';

const emptyService = (): Service => ({
  id: uid('svc'),
  name: '',
  description: '',
  price: 0,
  duration: 60,
  category: 'nails',
  image: '',
  active: true,
  order: 99,
});

const AdminServices: React.FC = () => {
  const { services, upsertService, deleteService, uploadImage, formatPrice, formatDuration } =
    useStudio();
  const [editing, setEditing] = useState<Service | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.name.trim()) return;
    upsertService(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Services</h1>
          <p className="mt-1 text-sm text-nala-muted">
            Manage catalogue (prices stay admin-only — never shown on the public site)
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setEditing(emptyService())}>
          Add service
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-nala-border bg-nala-ivory">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {[...services]
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <tr key={s.id} className="border-t border-nala-border/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {s.image && (
                        <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                      )}
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{s.category}</td>
                  <td className="px-4 py-3">{formatPrice(s.price, s.priceLabel)}</td>
                  <td className="px-4 py-3">{formatDuration(s.duration, s.durationLabel)}</td>
                  <td className="px-4 py-3">{s.active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className="btn-ghost" onClick={() => setEditing(s)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-ghost text-red-700"
                      onClick={() => confirm('Delete service?') && deleteService(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-nala-charcoal/40 p-4">
          <form
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-nala-border bg-nala-ivory p-6"
          >
            <h2 className="mb-4 font-display text-2xl">
              {services.some((s) => s.id === editing.id) ? 'Edit service' : 'Add service'}
            </h2>
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
                <label className="label-nala">Description</label>
                <textarea
                  className="input-nala min-h-[90px]"
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-nala">Price (NPR)</label>
                  <input
                    type="number"
                    className="input-nala"
                    value={editing.price ?? ''}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        price: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="label-nala">Price label (optional)</label>
                  <input
                    className="input-nala"
                    value={editing.priceLabel || ''}
                    onChange={(e) => setEditing({ ...editing, priceLabel: e.target.value })}
                    placeholder="On request"
                  />
                </div>
                <div>
                  <label className="label-nala">Duration (min)</label>
                  <input
                    type="number"
                    className="input-nala"
                    value={editing.duration ?? ''}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        duration: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="label-nala">Duration label</label>
                  <input
                    className="input-nala"
                    value={editing.durationLabel || ''}
                    onChange={(e) => setEditing({ ...editing, durationLabel: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label-nala">Category</label>
                <select
                  className="input-nala"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as ServiceCategory })
                  }
                >
                  <option value="nails">Nails</option>
                  <option value="lashes">Lashes</option>
                  <option value="brows">Brows</option>
                  <option value="beauty">Beauty</option>
                  <option value="courses">Courses</option>
                </select>
              </div>
              <div>
                <label className="label-nala">Order</label>
                <input
                  type="number"
                  className="input-nala"
                  value={editing.order}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="label-nala">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const src = await uploadImage(file);
                    setEditing({ ...editing, image: src });
                  }}
                />
                {editing.image && (
                  <img src={editing.image} alt="" className="mt-2 h-24 w-full rounded object-cover" />
                )}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.popular}
                  onChange={(e) => setEditing({ ...editing, popular: e.target.checked })}
                />
                Popular
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

export default AdminServices;
