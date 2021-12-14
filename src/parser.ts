import { prefixes } from './config';

export type ClassColor = {
  prefix: string;
  color: string;
  shade?: string;
  opacity?: string;
};

export function parseClassColor(className: string): ClassColor | false {
  const prefix = prefixes.find((pfx) => className.startsWith(`${pfx}-`));

  if (!prefix) return false;

  // the rest of unmatched part
  className = className.slice(prefix.length + 1);

  let result: RegExpExecArray | null;
  if ((result = /^(\w+)-(\d+)$/.exec(className))) {
    return {
      prefix,
      color: result[1],
      shade: result[2],
    };
  } else if ((result = /^(\w+)-(\d+)\/(\d*\.?\d+)$/.exec(className))) {
    return {
      prefix,
      color: result[1],
      shade: result[2],
      opacity: result[3],
    };
  } else if ((result = /^(\w+)$/.exec(className))) {
    return {
      prefix,
      color: result[1],
    };
  } else if ((result = /^(\w+)\/(\d*\.?\d+)$/.exec(className))) {
    return {
      prefix,
      color: result[1],
      opacity: result[2],
    };
  }
  return false;
}
