import React, { useMemo, useState } from 'react';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import type { Service, ServiceCategory } from '../../types';
import { SERVICE_CATEGORY_OPTIONS } from '../../types';
import { uid } from '../../lib/storage';
import { cn } from '../../lib/cn';

const emptyService = (): Service => ({
  id: uid('svc'),
  name: '',
  description: '',
  price: null,
  duration: 60,
  category: 'lashes',
  image: '',
  active: true,
  order: 99,
});

const PAGE_SIZE = 8;

const AdminServices: React.FC = () => {
  const { services, upsertService, deleteService, uploadImage, formatPrice, formatDuration } =
    useStudio();
  const [editing, setEditing] = useState<Service | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [page, setPage] = useState(1);

  const grouped = useMemo(() => {
    const sorted = [...services].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    return SERVICE_CATEGORY_OPTIONS.map((cat) => ({
      ...cat,
      items: sorted.filter((s) => s.category === cat.value),
    })).filter((g) => g.items.length > 0);
  }, [services]);

  const flatFiltered = useMemo(() => {
    const sorted = [...services].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    if (categoryFilter === 'all') return sorted;
    return sorted.filter((s) => s.category === categoryFilter);
  }, [services, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(flatFiltered.length / PAGE_SIZE));
  const pageItems = flatFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.name.trim()) return;
    upsertService(editing);
    setEditing(null);
  };

  const labelFor = (cat: ServiceCategory) =>
    SERVICE_CATEGORY_OPTIONS.find((c) => c.value === cat)?.label || cat;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Services</h1>
          <p className="mt-1 text-sm text-nala-muted">
            Grouped by category · prices stay admin-only
          </p>
        </div>
        <button
          type="button"
          className="btn-primary !text-xs"
          onClick={() => setEditing(emptyService())}
        >
          <Plus size={14} />
          Add service
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setCategoryFilter('all');
            setPage(1);
          }}
          className={cn(
            'rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em]',
            categoryFilter === 'all'
              ? 'bg-nala-charcoal text-white'
              : 'border border-nala-border text-nala-muted hover:border-nala-charcoal hover:text-nala-charcoal'
          )}
        >
          All ({services.length})
        </button>
        {grouped.map((g) => (
          <button
            key={g.value}
            type="button"
            onClick={() => {
              setCategoryFilter(g.value);
              setPage(1);
            }}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em]',
              categoryFilter === g.value
                ? 'bg-nala-charcoal text-white'
                : 'border border-nala-border text-nala-muted hover:border-nala-charcoal hover:text-nala-charcoal'
            )}
          >
            {g.label} ({g.items.length})
          </button>
        ))}
      </div>

      {categoryFilter === 'all' ? (
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.value} className="overflow-hidden rounded-xl border border-nala-border bg-nala-ivory">
              <div className="flex items-center justify-between border-b border-nala-border bg-nala-soft px-4 py-3">
                <h2 className="font-display text-lg text-nala-charcoal">{group.label}</h2>
                <span className="text-xs uppercase tracking-[0.12em] text-nala-muted">
                  {group.items.length} services
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.12em] text-nala-muted">
                    <tr>
                      <th className="px-4 py-2.5">Service</th>
                      <th className="px-4 py-2.5">Price</th>
                      <th className="px-4 py-2.5">Duration</th>
                      <th className="px-4 py-2.5">Active</th>
                      <th className="px-4 py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((s) => (
                      <tr key={s.id} className="border-t border-nala-border/70">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {s.image && (
                              <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                            )}
                            <div>
                              <p className="font-medium">{s.name}</p>
                              <p className="line-clamp-1 text-xs text-nala-muted">{s.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs">{formatPrice(s.price, s.priceLabel)}</td>
                        <td className="px-4 py-3 text-xs">
                          {formatDuration(s.duration, s.durationLabel)}
                        </td>
                        <td className="px-4 py-3 text-xs">{s.active ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 rounded-full border border-nala-border bg-white px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-nala-charcoal transition hover:border-nala-charcoal"
                              onClick={() => setEditing(s)}
                            >
                              <Pencil size={12} />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-red-800 transition hover:border-red-300"
                              onClick={() => confirm('Delete service?') && deleteService(s.id)}
                            >
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-nala-border bg-nala-ivory">
          <div className="flex items-center justify-between border-b border-nala-border bg-nala-soft px-4 py-3">
            <h2 className="font-display text-lg">{labelFor(categoryFilter)}</h2>
            <span className="text-xs uppercase tracking-[0.12em] text-nala-muted">
              Page {page} of {totalPages}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-nala-muted">
                <tr>
                  <th className="px-4 py-2.5">Service</th>
                  <th className="px-4 py-2.5">Price</th>
                  <th className="px-4 py-2.5">Duration</th>
                  <th className="px-4 py-2.5">Active</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((s) => (
                  <tr key={s.id} className="border-t border-nala-border/70">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {s.image && (
                          <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                        )}
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">{formatPrice(s.price, s.priceLabel)}</td>
                    <td className="px-4 py-3 text-xs">
                      {formatDuration(s.duration, s.durationLabel)}
                    </td>
                    <td className="px-4 py-3 text-xs">{s.active ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-nala-border bg-white px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-nala-charcoal transition hover:border-nala-charcoal"
                          onClick={() => setEditing(s)}
                        >
                          <Pencil size={12} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-red-800 transition hover:border-red-300"
                          onClick={() => confirm('Delete service?') && deleteService(s.id)}
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-nala-border px-4 py-3">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-nala-border px-3 py-1.5 text-xs uppercase tracking-[0.08em] disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <p className="text-xs text-nala-muted">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, flatFiltered.length)} of{' '}
                {flatFiltered.length}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-nala-border px-3 py-1.5 text-xs uppercase tracking-[0.08em] disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-nala-charcoal/40 p-4">
          <form
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-nala-border bg-nala-ivory p-6"
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
                  {SERVICE_CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
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
