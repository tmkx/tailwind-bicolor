import test from 'ava';
import colors from 'tailwindcss/colors';
import bicolor from '../src';
import { createClassNamesCompiler, findStringCount, withAlphaVariable, withAlphaValue } from './helpers';

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
    const result = await compile(`bi:bg-green-${a}`);
    t.is(findStringCount(result, withAlphaVariable(colors.green[a], '--tw-bg-opacity')), 1);
    t.is(findStringCount(result, withAlphaVariable(colors.green[b], '--tw-bg-opacity')), 1);
  }
});

test('support background-color', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:bg-green-${a}`);
    t.is(findStringCount(result, colors.green[a]), 1);
    t.is(findStringCount(result, colors.green[b]), 1);
  }
});

test('support text', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:text-red-${a}`);
    t.assert(result.includes('@media (prefers-color-scheme: dark)'));
    t.is(findStringCount(result, colors.red[a]), 1);
    t.is(findStringCount(result, colors.red[b]), 1);
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
    const result = await compile(`bi:text-red-${a}`);

    t.assert(!result.includes('@media (prefers-color-scheme: dark)'));
    t.assert(result.includes('.dark'));
    t.is(findStringCount(result, colors.red[a]), 1);
    t.is(findStringCount(result, colors.red[b]), 1);
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
    const result = await compile(`bi:text-red-${a}/30`);
    t.is(findStringCount(result, withAlphaValue(colors.red[a], 0.3)), 1);
    t.is(findStringCount(result, withAlphaValue(colors.red[b], 0.3)), 1);
  }
});

test('support decoration', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:decoration-teal-${a}`);
    t.is(findStringCount(result, colors.teal[a]), 1);
    t.is(findStringCount(result, colors.teal[b]), 1);
  }
});

test('support border', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:border-orange-${a}`);
    t.is(findStringCount(result, colors.orange[a]), 1);
    t.is(findStringCount(result, colors.orange[b]), 1);
  }
});

test('support border-x', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:border-x-amber-${a}`);
    t.is(findStringCount(result, colors.amber[a]), 2);
    t.is(findStringCount(result, colors.amber[b]), 2);
  }
});

test('support outline', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:outline-lime-${a}`);
    t.is(findStringCount(result, colors.lime[a]), 1);
    t.is(findStringCount(result, colors.lime[b]), 1);
  }
});

test('support accent', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:accent-lime-${a}`);
    t.is(findStringCount(result, colors.lime[a]), 1);
    t.is(findStringCount(result, colors.lime[b]), 1);
  }
});

test('support caret', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:caret-lime-${a}`);
    t.is(findStringCount(result, colors.lime[a]), 1);
    t.is(findStringCount(result, colors.lime[b]), 1);
  }
});

test('support fill', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:fill-lime-${a}`);
    t.is(findStringCount(result, colors.lime[a]), 1);
    t.is(findStringCount(result, colors.lime[b]), 1);
  }
});

test('support stroke', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:stroke-lime-${a}`);
    t.is(findStringCount(result, colors.lime[a]), 1);
    t.is(findStringCount(result, colors.lime[b]), 1);
  }
});

test('support shadow', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:shadow-rose-${a}`);
    t.is(findStringCount(result, colors.rose[a]), 1);
    t.is(findStringCount(result, colors.rose[b]), 1);
  }
});

test('support ring', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:ring-rose-${a}`);
    t.is(findStringCount(result, withAlphaVariable(colors.rose[a], '--tw-ring-opacity')), 1);
    t.is(findStringCount(result, withAlphaVariable(colors.rose[b], '--tw-ring-opacity')), 1);
  }
});

test('support ring-offset', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:ring-offset-zinc-${a}`);
    t.is(findStringCount(result, colors.zinc[a]), 1);
    t.is(findStringCount(result, colors.zinc[b]), 1);
  }
});

test('support divide', async (t) => {
  for (const [a, b] of modifierPairs) {
    const result = await compile(`bi:divide-zinc-${a}`);

    t.is(findStringCount(result, '.test > :not([hidden]) ~ :not([hidden])'), 2);
    t.is(findStringCount(result, '@media (prefers-color-scheme: dark)'), 1);
    t.is(findStringCount(result, colors.zinc[a]), 1);
    t.is(findStringCount(result, colors.zinc[b]), 1);
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
