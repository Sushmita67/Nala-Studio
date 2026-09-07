import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const bytes = fs.readFileSync('tmp-cert/NALA-2026-0005.pdf');
const pdf = await PDFDocument.load(bytes);
const page = pdf.getPages()[0];
console.log('size', page.getSize());
const contents = page.node.Contents();
const refs = Array.isArray(contents) ? contents : [contents];
let raw = Buffer.alloc(0);
for (const ref of refs) {
  const obj = pdf.context.lookup(ref);
  if (obj && typeof obj.getContents === 'function') {
    raw = Buffer.concat([raw, Buffer.from(obj.getContents())]);
  }
}
console.log('stream length', raw.length);
const s = raw.toString('latin1');
for (const pat of ['2026', 'Masters', 'Lash', 'Sush', 'NALA', 'Tj', 'TJ', 'BT']) {
  console.log(pat, s.split(pat).length - 1);
}
console.log('TAIL:\n', s.slice(-3000));
