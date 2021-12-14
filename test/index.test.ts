import test from 'ava';
import bicolor from '../src';
import { createClassNamesCompiler } from './helpers';

/**
 * default class names compiler
 */
const compile = createClassNamesCompiler({
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
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
  const result = await compile(`text-slate-100`);
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
    const aResult = await compile(`bi:bg-green-${a}`);
    const bResult = await compile(`bg-green-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support text', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:text-red-${a}`);
    const bResult = await compile(`text-red-${b}`);
    t.assert(aResult.includes('@media (prefers-color-scheme: dark)'));
    t.assert(aResult.includes(bResult));
  }
});

test('support class dark mode', async (t) => {
  const compile = createClassNamesCompiler({
    darkMode: 'class',
    corePlugins: {
      textOpacity: false,
    },
    plugins: [bicolor()],
  });

  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:text-red-${a}`);
    const bResult = await compile(`text-red-${b}`);
    t.assert(!aResult.includes('@media (prefers-color-scheme: dark)'));
    t.assert(aResult.includes('.dark'));
    t.assert(aResult.includes(bResult));
  }
});

test('support text:hover', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:hover:text-red-${a}`);
    const bResult = await compile(`hover:bi:text-red-${a}`);
    const cResult = await compile(`hover:text-red-${b}`);
    t.assert(aResult.includes(cResult));
    t.assert(bResult.includes(cResult));
  }
});

test('support custom opacity', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:text-red-${a}/30`);
    const bResult = await compile(`text-red-${b}/30`);
    t.assert(aResult.includes(bResult));
  }
});

test('support decoration', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:decoration-teal-${a}`);
    const bResult = await compile(`decoration-teal-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support border', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:border-orange-${a}`);
    const bResult = await compile(`border-orange-${b}`);
    t.assert(aResult.includes(bResult), aResult);
  }
});

test('support outline', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:outline-lime-${a}`);
    const bResult = await compile(`outline-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support accent', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:accent-lime-${a}`);
    const bResult = await compile(`accent-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support caret', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:caret-lime-${a}`);
    const bResult = await compile(`caret-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support fill', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:fill-lime-${a}`);
    const bResult = await compile(`fill-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support stroke', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:stroke-lime-${a}`);
    const bResult = await compile(`stroke-lime-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support shadow', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:shadow-rose-${a}`);
    const bResult = await compile(`shadow-rose-${b}`);
    t.assert(aResult.includes(bResult.match(/(--tw-shadow-color:.+);/)?.[1] || 'UNMATCHED'));
  }
});

test('support ring', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:ring-rose-${a}`);
    const bResult = await compile(`ring-rose-${b}`);
    t.assert(aResult.includes(bResult.match(/(--tw-ring-color:.+)/)?.[1] || 'UNMATCHED'));
  }
});

test('support ring-offset', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:ring-offset-zinc-${a}`);
    const bResult = await compile(`ring-offset-zinc-${b}`);
    t.assert(aResult.includes(bResult));
  }
});

test('support divide', async (t) => {
  for (const [a, b] of modifierPairs) {
    const aResult = await compile(`bi:divide-zinc-${a}`);
    const bResult = await compile(`divide-zinc-${b}`);
    t.assert(aResult.includes('.test'));
    t.assert(bResult.includes('.test'));
    t.assert(aResult.includes(bResult));
  }
});

test('support reverse `white` and `black`', async (t) => {
  t.true((await compile(`bi:bg-white`)).includes(await compile(`bg-black`)));
  t.true((await compile(`bi:bg-black`)).includes(await compile(`bg-white`)));
});

test('shout not affect unknown modifiers', async (t) => {
  t.is(await compile(`bi:text-inherit`), await compile(`text-inherit`));
  t.is(await compile(`bi:text-current`), await compile(`text-current`));
});
