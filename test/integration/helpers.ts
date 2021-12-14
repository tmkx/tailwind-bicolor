import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const execFile = promisify(childProcess.execFile);

const OUTPUT_DIR = path.join(__dirname, 'output');

export async function run(title: string, content: string, config = { preset: 'default' }) {
  const dir = path.join(OUTPUT_DIR, title.match(/\w+/g)?.join('-') || 'default');
  if (!dir || fs.existsSync(dir)) {
    throw new Error(`dir exists: ${dir}`);
  }

  fs.mkdirSync(dir);

  const inputCss = path.join(dir, 'input.css');
  const inputFile = path.join(dir, 'input.html');
  const outputFile = path.join(dir, 'output.css');

  await writeFile(inputCss, ['@tailwind base', '@tailwind components', '@tailwind utilities'].join(';\n'));
  await writeFile(inputFile, content);

  const configPath = path.join(__dirname, 'configs', `tailwind.${config.preset}.js`);

  const { stdout, stderr } = await execFile(
    'npx',
    [
      'tailwindcss',
      ['--config', configPath],
      ['--content', path.join(dir, '**/*.{html,css}')],
      '--no-autoprefixer',
      ['--input', inputCss],
      ['--output', outputFile],
    ].flat(),
    {
      cwd: __dirname,
    }
  );

  return {
    stdout,
    stderr,
    output: await readFile(outputFile, { encoding: 'utf8' }),
  };
}

export function init() {
  fs.existsSync(OUTPUT_DIR) && dispose();
  fs.mkdirSync(OUTPUT_DIR);
}

export function dispose() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
