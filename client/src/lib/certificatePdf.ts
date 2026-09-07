import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { Certificate } from '../types';
import templateUrl from '../assets/default-certificate-template-v1.pdf?url';

/**
 * Text placement on landscape A4 template (841.89 × 595.28).
 * Coordinates are from the bottom-left origin (PDF space).
 *
 * Template already prints “from” / “to” and the signatory block —
 * we only fill: student, course, start date, end date, date awarded, cert id.
 */
const LAYOUT = {
  studentName: { x: 420, y: 300, size: 28, maxWidth: 520 },
  // Further right on the course underline
  courseName: { x: 535, y: 252, size: 13, maxWidth: 360 },
  // Blanks on “from …… to ……” — slight equal nudge right
  startDate: { x: 430, y: 226, size: 11, maxWidth: 90 },
  completionDate: { x: 540, y: 226, size: 11, maxWidth: 90 },
  // DATE line — slight right
  dateAwarded: { x: 190, y: 120, size: 11, maxWidth: 160 },
  certificateId: { x: 420.9, y: 34, size: 9, maxWidth: 280 },
} as const;

function centerText(
  page: ReturnType<PDFDocument['getPages']>[number],
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  opts: { x: number; y: number; size: number; maxWidth: number }
) {
  const width = font.widthOfTextAtSize(text, opts.size);
  const x = Math.max(40, opts.x - Math.min(width, opts.maxWidth) / 2);
  page.drawText(text, {
    x,
    y: opts.y,
    size: opts.size,
    font,
    color: rgb(0.17, 0.14, 0.125),
    maxWidth: opts.maxWidth,
  });
}

function leftText(
  page: ReturnType<PDFDocument['getPages']>[number],
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  opts: { x: number; y: number; size: number; maxWidth: number }
) {
  page.drawText(text, {
    x: opts.x,
    y: opts.y,
    size: opts.size,
    font,
    color: rgb(0.17, 0.14, 0.125),
    maxWidth: opts.maxWidth,
  });
}

async function loadTemplateBytes(): Promise<ArrayBuffer> {
  const res = await fetch(templateUrl);
  if (!res.ok) throw new Error('Could not load certificate template');
  return res.arrayBuffer();
}

/** Fill the NALA certificate PDF template with certificate merge data. */
export async function fillCertificatePdf(cert: Certificate): Promise<Uint8Array> {
  const bytes = await loadTemplateBytes();
  const pdf = await PDFDocument.load(bytes);
  const page = pdf.getPages()[0];
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const student = cert.studentName.trim() || '—';
  const course = cert.course.trim() || '—';
  const start = (cert.startDate || '').trim() || '—';
  const end = (cert.completionDate || '').trim() || '—';
  const awarded = (cert.dateAwarded || cert.completionDate || '').trim() || '—';
  const id = cert.certificateNumber.trim() || '—';

  centerText(page, student, fontBold, { ...LAYOUT.studentName, size: LAYOUT.studentName.size });
  centerText(page, course, font, { ...LAYOUT.courseName, size: LAYOUT.courseName.size });
  leftText(page, start, font, LAYOUT.startDate);
  leftText(page, end, font, LAYOUT.completionDate);
  leftText(page, awarded, font, LAYOUT.dateAwarded);
  centerText(page, id, font, LAYOUT.certificateId);

  return pdf.save();
}

export async function downloadCertificatePdf(cert: Certificate, fileName?: string) {
  const bytes = await fillCertificatePdf(cert);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || `${cert.certificateNumber || 'certificate'}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function certificatePdfObjectUrl(cert: Certificate): Promise<string> {
  const bytes = await fillCertificatePdf(cert);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}
