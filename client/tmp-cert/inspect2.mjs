import fs from 'fs';
import { PDFDocument, PDFName, PDFArray, PDFRawStream, PDFStream, PDFDict } from 'pdf-lib';

const bytes = fs.readFileSync('tmp-cert/NALA-2026-0005.pdf');
const pdf = await PDFDocument.load(bytes);
const page = pdf.getPages()[0];
const node = page.node;
console.log('keys', [...node.keys()].map(String));
const contents = node.get(PDFName.of('Contents'));
console.log('Contents type', contents?.constructor?.name, String(contents));

function dumpStream(obj, label) {
  if (!obj) return;
  console.log(label, obj.constructor?.name);
  if (typeof obj.getContents === 'function') {
    const c = obj.getContents();
    console.log(label, 'bytes', c?.length);
    if (c?.length) {
      const s = Buffer.from(c).toString('latin1');
      console.log(label, 'sample', JSON.stringify(s.slice(0, 200)));
      console.log(label, 'tail', JSON.stringify(s.slice(-800)));
    }
  }
  if (obj instanceof PDFDict) {
    console.log(label, 'dict keys', [...obj.keys()].map(String));
  }
}

if (contents instanceof PDFArray) {
  console.log('array size', contents.size());
  for (let i = 0; i < contents.size(); i++) {
    const ref = contents.get(i);
    dumpStream(pdf.context.lookup(ref), `part${i}`);
  }
} else {
  dumpStream(pdf.context.lookup(contents), 'single');
  dumpStream(contents, 'direct');
}

// Also try rendering via canvas with pdfjs if we can install quickly
