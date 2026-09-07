import fs from 'fs';
import zlib from 'zlib';
import { PDFDocument, PDFName, PDFArray } from 'pdf-lib';

const bytes = fs.readFileSync('tmp-cert/NALA-2026-0005.pdf');
const pdf = await PDFDocument.load(bytes);
const page = pdf.getPages()[0];
const contents = page.node.get(PDFName.of('Contents'));

function inflateMaybe(buf) {
  try {
    return zlib.inflateSync(buf);
  } catch {
    try {
      return zlib.unzipSync(buf);
    } catch {
      return buf;
    }
  }
}

if (contents instanceof PDFArray) {
  for (let i = 0; i < contents.size(); i++) {
    const obj = pdf.context.lookup(contents.get(i));
    const raw = Buffer.from(obj.getContents());
    const out = inflateMaybe(raw);
    const s = out.toString('latin1');
    if (/2026|Masters|Sush|NALA|Tj|BT/.test(s)) {
      console.log(`\n===== part ${i} inflated ${out.length} =====`);
      console.log(s);
    }
  }
}
