import test from 'ava';
import bicolor from '../src';
import { createClassNamesCompiler } from './_helpers';

/**
 * default class names compiler
 */
const compileClassNames = createClassNamesCompiler({
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
  },
  plugins: [bicolor()],
});

const modifierPairs = [
  ['50', '900'],
  ['100', '800'],
  ['200', '700'],
  ['300', '600'],
  ['400', '500'],
  ['500', '400'],
  ['600', '300'],
  ['700', '200'],
  ['800', '100'],
  ['900', '50'],
];

test('should not affect others', async (t) => {
  const result = await compileClassNames(`text-slate-100`);
  t.snapshot(result);
});

test('support background-color with opacity', async (t) => {
  const compile = createClassNamesCompiler(bicolor());

  for (const [a, b] of modifierPairs) {
    const targetBgDecl = (await compile(`bg-green-${b}`)).match(/background-color:.+/)?.[0];

    t.truthy(targetBgDecl!.includes('--tw-bg-opacity'));
    t.true((await compile(`bi:bg-green-${a}`)).includes(targetBgDecl!));
  }
});

test('support background-color', async (t) => {
  for (const [a, b] of modifierPairs) {
    t.true((await compileClassNames(`bi:bg-green-${a}`)).includes(await compileClassNames(`bg-green-${b}`)));
  }
});

test('support text', async (t) => {
  for (const [a, b] of modifierPairs) {
    t.true((await compileClassNames(`bi:text-red-${a}`)).includes(await compileClassNames(`text-red-${b}`)));
  }
});

test.only('support reverse `white` and `black`', async (t) => {
  t.true((await compileClassNames(`bi:bg-white`)).includes(await compileClassNames(`bg-black`)));
  t.true((await compileClassNames(`bi:bg-black`)).includes(await compileClassNames(`bg-white`)));
});
