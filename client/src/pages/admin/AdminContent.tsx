import React, { useEffect, useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { SiteContent } from '../../types';

const AdminContent: React.FC = () => {
  const { content, updateContent, uploadImage } = useStudio();
  const [form, setForm] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(content);
  }, [content]);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Content</h1>
        <p className="mt-1 text-sm text-nala-muted">Edit website copy and key images</p>
      </div>

      <form onSubmit={onSave} className="space-y-8">
        <section className="rounded-md border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-4 font-display text-xl">Home / Hero</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="label-nala">Hero title</label>
              <input className="input-nala" value={form.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label-nala">Hero subtitle</label>
              <input className="input-nala" value={form.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Primary CTA</label>
              <input className="input-nala" value={form.heroCtaPrimary} onChange={(e) => set('heroCtaPrimary', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Secondary CTA</label>
              <input className="input-nala" value={form.heroCtaSecondary} onChange={(e) => set('heroCtaSecondary', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label-nala">Hero image</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  set('heroImage', await uploadImage(file));
                }}
              />
              {form.heroImage && <img src={form.heroImage} alt="" className="mt-2 h-32 w-full rounded object-cover" />}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-4 font-display text-xl">About</h2>
          <div className="space-y-3">
            <div>
              <label className="label-nala">Heading</label>
              <input className="input-nala" value={form.aboutHeading} onChange={(e) => set('aboutHeading', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Description</label>
              <textarea className="input-nala min-h-[120px]" value={form.aboutDescription} onChange={(e) => set('aboutDescription', e.target.value)} />
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

        <section className="rounded-md border border-nala-border bg-nala-ivory p-5">
          <h2 className="mb-4 font-display text-xl">Contact & Social</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="label-nala">Phone</label>
              <input className="input-nala" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Instagram handle</label>
              <input className="input-nala" value={form.instagramHandle} onChange={(e) => set('instagramHandle', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Instagram URL</label>
              <input className="input-nala" value={form.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Facebook URL</label>
              <input className="input-nala" value={form.facebookUrl} onChange={(e) => set('facebookUrl', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Address line 1</label>
              <input className="input-nala" value={form.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Address line 2</label>
              <input className="input-nala" value={form.addressLine2} onChange={(e) => set('addressLine2', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Weekday hours</label>
              <input className="input-nala" value={form.hoursWeekday} onChange={(e) => set('hoursWeekday', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Saturday hours</label>
              <input className="input-nala" value={form.hoursSaturday} onChange={(e) => set('hoursSaturday', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Google rating</label>
              <input className="input-nala" value={form.googleRating} onChange={(e) => set('googleRating', e.target.value)} />
            </div>
            <div>
              <label className="label-nala">Google review count</label>
              <input className="input-nala" value={form.googleReviewCount} onChange={(e) => set('googleReviewCount', e.target.value)} />
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
