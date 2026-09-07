import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { Course } from '../../types';
import { uid } from '../../lib/storage';

const blank = (): Course => ({
  id: uid('course'),
  name: '',
  description: '',
  duration: 'Flexible',
  price: 'On request',
  image: '',
  curriculum: [''],
  enrollmentInfo: 'Contact the studio to enroll.',
  active: true,
  order: 99,
});

const AdminCourses: React.FC = () => {
  const { courses, upsertCourse, deleteCourse, uploadImage } = useStudio();
  const [editing, setEditing] = useState<Course | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.name.trim()) return;
    upsertCourse({
      ...editing,
      curriculum: editing.curriculum.map((c) => c.trim()).filter(Boolean),
    });
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Courses</h1>
          <p className="mt-1 text-sm text-nala-muted">Beauty education content</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setEditing(blank())}>
          Add course
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-md border border-nala-border bg-nala-ivory p-5">
            <div className="flex gap-4">
              {course.image && (
                <img src={course.image} alt="" className="h-20 w-24 rounded object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl">{course.name}</h2>
                <p className="mt-1 text-sm text-nala-muted line-clamp-2">{course.description}</p>
                <p className="mt-2 text-sm text-nala-muted">
                  {course.duration} · {course.price}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-secondary !py-2" onClick={() => setEditing(course)}>
                Edit
              </button>
              <button
                type="button"
                className="btn-ghost text-red-700"
                onClick={() => confirm('Delete course?') && deleteCourse(course.id)}
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
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-nala-border bg-nala-ivory p-6"
          >
            <h2 className="mb-4 font-display text-2xl">Course</h2>
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
                  <label className="label-nala">Duration</label>
                  <input
                    className="input-nala"
                    value={editing.duration}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-nala">Price</label>
                  <input
                    className="input-nala"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label-nala">Curriculum (one per line)</label>
                <textarea
                  className="input-nala min-h-[120px]"
                  value={editing.curriculum.join('\n')}
                  onChange={(e) =>
                    setEditing({ ...editing, curriculum: e.target.value.split('\n') })
                  }
                />
              </div>
              <div>
                <label className="label-nala">Enrollment info</label>
                <textarea
                  className="input-nala"
                  value={editing.enrollmentInfo}
                  onChange={(e) => setEditing({ ...editing, enrollmentInfo: e.target.value })}
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
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Active
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

export default AdminCourses;
