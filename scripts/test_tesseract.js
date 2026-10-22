import { createWorker } from 'tesseract.js';
import path from 'path';

async function test() {
  const worker = await createWorker('eng');
  const imgPath = path.resolve('scripts/extracted_june_samples/page_1_img_0_Im0.png');
  console.log('Recognizing:', imgPath);
  const ret = await worker.recognize(imgPath);
  console.log('--- RECOGNIZED TEXT ---');
  console.log(ret.data.text);
  await worker.terminate();
}

test().catch(console.error);
