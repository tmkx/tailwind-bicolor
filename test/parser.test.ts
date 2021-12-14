import test from 'ava';
import { parseClassColor } from '../src/parser';

test('should parse class color', (t) => {
  t.deepEqual(parseClassColor('text-white'), {
    prefix: 'text',
    color: 'white',
  });

  t.deepEqual(parseClassColor('text-blue-100'), {
    prefix: 'text',
    color: 'blue',
    shade: '100',
  });

  t.deepEqual(parseClassColor('bg-red-200'), {
    prefix: 'bg',
    color: 'red',
    shade: '200',
  });

  t.deepEqual(parseClassColor('border-teal-200'), {
    prefix: 'border',
    color: 'teal',
    shade: '200',
  });

  t.deepEqual(parseClassColor('border-l-teal-200'), {
    prefix: 'border-l',
    color: 'teal',
    shade: '200',
  });

  t.deepEqual(parseClassColor('border-x-teal-200/30'), {
    prefix: 'border-x',
    color: 'teal',
    shade: '200',
    opacity: '30',
  });

  t.deepEqual(parseClassColor('bg-red-200/50'), {
    prefix: 'bg',
    color: 'red',
    shade: '200',
    opacity: '50',
  });

  t.deepEqual(parseClassColor('bg-red-200/12.34'), {
    prefix: 'bg',
    color: 'red',
    shade: '200',
    opacity: '12.34',
  });

  t.deepEqual(parseClassColor('bg-N300'), {
    prefix: 'bg',
    color: 'N300',
  });

  t.deepEqual(parseClassColor('bg-B500/30'), {
    prefix: 'bg',
    color: 'B500',
    opacity: '30',
  });
});

test('should return false if parse class color failed', (t) => {
  t.false(parseClassColor('flex'));
  t.false(parseClassColor('justify-center'));
});
