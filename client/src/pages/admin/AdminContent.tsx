import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import type { HeroSlide, SiteContent } from '../../types';
import { uid } from '../../lib/storage';

const AdminContent: React.FC = () => {
  const { content, updateContent, uploadImage } = useStudio();
  const [form, setForm] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content);
  }, [content]);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const slides = useMemo(
    () => [...(form.heroSlides || [])].sort((a, b) => a.order - b.order),
    [form.heroSlides]
  );

  const syncHeroImage = (nextSlides: HeroSlide[]) => {
    const first = [...nextSlides].sort((a, b) => a.order - b.order).find((s) => s.active);
    setForm((prev) => ({
      ...prev,
      heroSlides: nextSlides,
      heroImage: first?.src || prev.heroImage,
    }));
  };

  const updateSlide = (id: string, patch: Partial<HeroSlide>) => {
    syncHeroImage(slides.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const moveSlide = (id: string, dir: -1 | 1) => {
    const idx = slides.findIndex((s) => s.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= slides.length) return;
    const next = slides.map((s) => ({ ...s }));
    const a = next[idx];
    const b = next[swap];
    const aOrder = a.order;
    a.order = b.order;
    b.order = aOrder;
    syncHeroImage(next);
  };

  const addSlide = async (file: File) => {
    const src = await uploadImage(file);
    const order = (slides[slides.length - 1]?.order || 0) + 1;
    syncHeroImage([
      ...slides,
      { id: uid('slide'), src, alt: 'NALA Studio', order, active: true },
    ]);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('Keep at least one hero slide.');
      return;
    }
    if (!confirm('Remove this slide?')) return;
    syncHeroImage(slides.filter((s) => s.id !== id));
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const first = slides.find((s) => s.active) || slides[0];
    updateContent({ ...form, heroSlides: slides, heroImage: first?.src || form.heroImage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Content</h1>
        <p className="mt-1 text-sm text-nala-muted">
          Edit website copy and the homepage hero slider
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-8">
        <section className="rounded-xl border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-1 font-display text-xl">Home / Hero</h2>
          <p className="mb-4 text-xs text-nala-muted">
            Copy sits over the rotating slider. Manage slides below.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="label-nala">Hero title</label>
              <input
                className="input-nala"
                value={form.heroTitle}
                onChange={(e) => set('heroTitle', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-nala">Hero subtitle</label>
              <input
                className="input-nala"
                value={form.heroSubtitle}
                onChange={(e) => set('heroSubtitle', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Primary CTA</label>
              <input
                className="input-nala"
                value={form.heroCtaPrimary}
                onChange={(e) => set('heroCtaPrimary', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Secondary CTA</label>
              <input
                className="input-nala"
                value={form.heroCtaSecondary}
                onChange={(e) => set('heroCtaSecondary', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 border-t border-nala-border/70 pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg">Hero slider images</h3>
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-nala-charcoal px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white">
                <Plus size={12} />
                Add slide
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    await addSlide(file);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>

            <ul className="space-y-3">
              {slides.map((slide, index) => (
                <li
                  key={slide.id}
                  className="flex flex-col gap-3 rounded-xl border border-nala-border/80 bg-white/70 p-3 sm:flex-row sm:items-center"
                >
                  <img
                    src={slide.src}
                    alt=""
                    className="h-20 w-full rounded-lg object-cover sm:h-16 sm:w-28"
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <input
                      className="input-nala"
                      value={slide.alt}
                      onChange={(e) => updateSlide(slide.id, { alt: e.target.value })}
                      placeholder="Alt text"
                    />
                    <label className="flex items-center gap-2 text-xs text-nala-muted">
                      <input
                        type="checkbox"
                        checked={slide.active}
                        onChange={(e) => updateSlide(slide.id, { active: e.target.checked })}
                      />
                      Active in slider
                    </label>
                  </div>
                  <div className="flex items-center gap-1.5 sm:flex-col">
                    <button
                      type="button"
                      className="rounded-full border border-nala-border p-2 text-nala-charcoal disabled:opacity-30"
                      disabled={index === 0}
                      onClick={() => moveSlide(slide.id, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-nala-border p-2 text-nala-charcoal disabled:opacity-30"
                      disabled={index === slides.length - 1}
                      onClick={() => moveSlide(slide.id, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-200 bg-red-50 p-2 text-red-800"
                      onClick={() => removeSlide(slide.id)}
                      aria-label="Remove slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <label className="text-[10px] uppercase tracking-[0.1em] text-nala-muted sm:w-24">
                    Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-[10px]"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        updateSlide(slide.id, { src: await uploadImage(file) });
                        e.target.value = '';
                      }}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-4 font-display text-xl">About</h2>
          <div className="space-y-3">
            <div>
              <label className="label-nala">Heading</label>
              <input
                className="input-nala"
                value={form.aboutHeading}
                onChange={(e) => set('aboutHeading', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Description</label>
              <textarea
                className="input-nala min-h-[120px]"
                value={form.aboutDescription}
                onChange={(e) => set('aboutDescription', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">About image</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  set('aboutImage', await uploadImage(file));
                }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-4 font-display text-xl">Contact & Social</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="label-nala">Phone</label>
              <input className="input-nala" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Instagram handle</label>
              <input
                className="input-nala"
                value={form.instagramHandle}
                onChange={(e) => set('instagramHandle', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Instagram URL</label>
              <input
                className="input-nala"
                value={form.instagramUrl}
                onChange={(e) => set('instagramUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Facebook URL</label>
              <input
                className="input-nala"
                value={form.facebookUrl}
                onChange={(e) => set('facebookUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Address line 1</label>
              <input
                className="input-nala"
                value={form.addressLine1}
                onChange={(e) => set('addressLine1', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Address line 2</label>
              <input
                className="input-nala"
                value={form.addressLine2}
                onChange={(e) => set('addressLine2', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Weekday hours</label>
              <input
                className="input-nala"
                value={form.hoursWeekday}
                onChange={(e) => set('hoursWeekday', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Saturday hours</label>
              <input
                className="input-nala"
                value={form.hoursSaturday}
                onChange={(e) => set('hoursSaturday', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Google rating</label>
              <input
                className="input-nala"
                value={form.googleRating}
                onChange={(e) => set('googleRating', e.target.value)}
              />
            </div>
            <div>
              <label className="label-nala">Google review count</label>
              <input
                className="input-nala"
                value={form.googleReviewCount}
                onChange={(e) => set('googleReviewCount', e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary">
            Save content
          </button>
          {saved && <span className="text-sm text-emerald-700">Saved</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminContent;
