import test from 'ava';
import colors from 'tailwindcss/colors';
import { init, run } from './helpers';
import { findStringCount, withAlphaVariable, withAlphaValue } from '../helpers';

test.before(() => {
  init();
});

test('should not affect non-bi classes', async (t) => {
  const { output } = await run(t.title, `<div class="bg-green-100" />`);
  t.snapshot(output);
});

test('support common usage', async (t) => {
  const { output } = await run(t.title, `<div class="bi:bg-green-200" />`);
  t.is(findStringCount(output, '.bi\\:bg-green-200'), 2);
  t.is(findStringCount(output, '@media (prefers-color-scheme: dark)'), 1);
  t.is(findStringCount(output, '--tw-bg-opacity: 1;'), 1);
  t.is(findStringCount(output, '--tw-bg-opacity'), 3);
});

test('support class dark mode', async (t) => {
  const { output } = await run(t.title, `<div class="bi:bg-green-200" />`, {
    preset: 'class',
  });
  t.is(findStringCount(output, '.bi\\:bg-green-200'), 2);
  t.is(findStringCount(output, '.dark .bi\\:bg-green-200'), 1);
  t.is(findStringCount(output, '--tw-bg-opacity: 1;'), 1);
  t.is(findStringCount(output, '--tw-bg-opacity'), 3);
});

test('support custom opacity', async (t) => {
  const { output } = await run(t.title, `<div class="bi:text-slate-100/60" />`);
  t.is(findStringCount(output, withAlphaValue(colors.slate['100'], 0.6)), 1);
  t.is(findStringCount(output, withAlphaValue(colors.slate['800'], 0.6)), 1);
});

test('support reverse `white` and `black`', async (t) => {
  const { output } = await run(t.title, `<div class="bi:decoration-white" />`);
  t.is(findStringCount(output, 'text-decoration-color: #fff'), 1);
  t.is(findStringCount(output, 'text-decoration-color: #000'), 1);
});

test('support hyphened prefix', async (t) => {
  const { output } = await run(t.title, `<div class="bi:border-x-rose-300" />`);
  t.is(findStringCount(output, '--tw-border-opacity: 1;'), 1);
  t.is(findStringCount(output, '--tw-border-opacity'), 5);
  t.is(findStringCount(output, 'border-left-color'), 2);
  t.is(findStringCount(output, 'border-right-color'), 2);
});

test('support shadow', async (t) => {
  const { output } = await run(t.title, `<div class="shadow-sm bi:shadow-zinc-700" />`);
  t.is(findStringCount(output, `--tw-shadow-color: ${colors.zinc['700']}`), 1);
  t.is(findStringCount(output, `--tw-shadow-color: ${colors.zinc['200']}`), 1);
});

test('support divide', async (t) => {
  const { output } = await run(t.title, `<div class="divide-y bi:divide-cyan-200" />`);
  t.is(findStringCount(output, '.bi\\:divide-cyan-200 > :not([hidden]) ~ :not([hidden])'), 2);
  t.is(findStringCount(output, '@media (prefers-color-scheme: dark)'), 1);
  t.is(findStringCount(output, '--tw-divide-opacity'), 3);
  t.is(findStringCount(output, withAlphaVariable(colors.cyan['200'], '--tw-divide-opacity')), 1);
  t.is(findStringCount(output, withAlphaVariable(colors.cyan['700'], '--tw-divide-opacity')), 1);
});

test('support divide in class dark mode', async (t) => {
  const { output } = await run(t.title, `<div class="divide-y bi:divide-emerald-200" />`, {
    preset: 'class',
  });
  t.is(findStringCount(output, '.bi\\:divide-emerald-200 > :not([hidden]) ~ :not([hidden])'), 2);
  t.is(findStringCount(output, '.dark .bi\\:divide-emerald-200'), 1);
  t.is(findStringCount(output, '--tw-divide-opacity'), 3);
  t.is(findStringCount(output, withAlphaVariable(colors.emerald['200'], '--tw-divide-opacity')), 1);
  t.is(findStringCount(output, withAlphaVariable(colors.emerald['700'], '--tw-divide-opacity')), 1);
});

test('support ring', async (t) => {
  const { output } = await run(t.title, `<div class="ring-2 bi:ring-neutral-800" />`);
  t.is(findStringCount(output, '--tw-ring-opacity'), 3);
  t.is(findStringCount(output, withAlphaVariable(colors.neutral['800'], '--tw-ring-opacity')), 1);
  t.is(findStringCount(output, withAlphaVariable(colors.neutral['100'], '--tw-ring-opacity')), 1);
});
