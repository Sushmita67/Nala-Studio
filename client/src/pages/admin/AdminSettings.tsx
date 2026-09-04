import React, { useEffect, useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { SiteSettings } from '../../types';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetData } = useStudio();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...form,
      bookingTimeSlots: form.bookingTimeSlots.map((s) => s.trim()).filter(Boolean),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-nala-muted">Studio configuration</p>
      </div>

      <form onSubmit={onSave} className="max-w-xl space-y-4 rounded-md border border-nala-border bg-nala-ivory p-5">
        <div>
          <label className="label-nala">Studio name</label>
          <input
            className="input-nala"
            value={form.studioName}
            onChange={(e) => setForm({ ...form, studioName: e.target.value })}
          />
        </div>
        <div>
          <label className="label-nala">Formspree form ID</label>
          <input
            className="input-nala"
            value={form.formspreeFormId}
            onChange={(e) => setForm({ ...form, formspreeFormId: e.target.value })}
          />
          <p className="mt-1 text-xs text-nala-muted">
            Booking notifications are sent through this Formspree endpoint.
          </p>
        </div>
        <div>
          <label className="label-nala">Admin password</label>
          <input
            type="password"
            className="input-nala"
            value={form.adminPassword}
            onChange={(e) => setForm({ ...form, adminPassword: e.target.value })}
          />
        </div>
        <div>
          <label className="label-nala">Certificate prefix</label>
          <input
            className="input-nala"
            value={form.certificatePrefix}
            onChange={(e) => setForm({ ...form, certificatePrefix: e.target.value })}
          />
        </div>
        <div>
          <label className="label-nala">Booking time slots (one per line)</label>
          <textarea
            className="input-nala min-h-[120px]"
            value={form.bookingTimeSlots.join('\n')}
            onChange={(e) =>
              setForm({ ...form, bookingTimeSlots: e.target.value.split('\n') })
            }
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            Save settings
          </button>
          {saved && <span className="text-sm text-emerald-700">Saved</span>}
        </div>
      </form>

      <div className="rounded-md border border-red-200 bg-red-50 p-5">
        <h2 className="font-medium text-red-900">Reset studio data</h2>
        <p className="mt-1 text-sm text-red-800">
          Restores seed content. Bookings and certificates stored in this browser will be cleared.
        </p>
        <button
          type="button"
          className="btn-secondary mt-4 border-red-300 text-red-800"
          onClick={() => {
            if (confirm('Reset all studio data in this browser?')) resetData();
          }}
        >
          Reset data
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
