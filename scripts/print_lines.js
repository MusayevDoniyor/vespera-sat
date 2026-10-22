import { createWorker } from 'tesseract.js';
import path from 'path';

async function run() {
  const worker = await createWorker('eng');
  const imgPath = path.resolve('scripts/extracted_june_samples/page_2_img_0_Im0.png');
  const ret = await worker.recognize(imgPath);
  
  console.log('Keys of ret.data:', Object.keys(ret.data));
  if (ret.data.blocks) {
    console.log('Total blocks:', ret.data.blocks.length);
    for (const b of ret.data.blocks) {
      console.log(`BLOCK (${b.bbox.x0}, ${b.bbox.y0}) - (${b.bbox.x1}, ${b.bbox.y1}):`);
      console.log(b.text.trim());
    }
  }
  await worker.terminate();
}

run().catch(console.error);
