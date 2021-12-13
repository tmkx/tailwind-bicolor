import test from 'ava';
import bicolor from '../src';
import { createClassNamesCompiler } from './helpers';

/**
 * default class names compiler
 */
const compileClassNames = createClassNamesCompiler({
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
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

test('should not affect non-bi classes', async (t) => {
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
    const aResult = await compileClassNames(`bi:bg-green-${a}`);
    const bResult = await compileClassNames(`bg-green-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support text', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compileClassNames(`bi:text-red-${a}`);
    const bResult = await compileClassNames(`text-red-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support decoration', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compileClassNames(`bi:decoration-teal-${a}`);
    const bResult = await compileClassNames(`decoration-teal-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support border', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compileClassNames(`bi:border-orange-${a}`);
    const bResult = await compileClassNames(`border-orange-${b}`);
    t.assert(aResult.includes(bResult), aResult);
  }
});

test('support outline', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compileClassNames(`bi:outline-lime-${a}`);
    const bResult = await compileClassNames(`outline-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support reverse `white` and `black`', async (t) => {
  t.true((await compileClassNames(`bi:bg-white`)).includes(await compileClassNames(`bg-black`)));
  t.true((await compileClassNames(`bi:bg-black`)).includes(await compileClassNames(`bg-white`)));
});

test('shout not affect unknown modifiers', async (t) => {
  t.is(await compileClassNames(`bi:text-inherit`), await compileClassNames(`text-inherit`));
});
