# tailwind-bicolor

Auto handle tailwind dark mode color, support `class` and `media`.

```html
<div class="bg-white dark:bg-black"></div>
<!-- Replace with below ↓↓↓ -->
<div class="bi:bg-white"></div>
```

> Tested in tailwind 3.x only.

## Features

- `bg-white` to `bg-black`
- `bg-slate-50` to `bg-slate-900`
- `bg-slate-100` to `bg-slate-800`
- `bg-slate-200` to `bg-slate-700`
- `bg-slate-300/40` to `bg-slate-600/40`
- and so on...

For example:

```html
<div class="bi:bg-green-400"></div>
```

will generate:

```css
.bi\:bg-green-400 {
  --tw-bg-opacity: 1;
  /* green-400 */
  background-color: rgb(74 222 128 / var(--tw-bg-opacity));
}
.dark .bi\:bg-green-400 {
  /* green-500 */
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
}
```

## Usage

```javascript
// tailwind.config.js
const { bicolor } = require('tailwind-bicolor');

module.exports = {
  // ...
  plugins: [bicolor()],
};
```

prefix support list:

- bg (background-color)
- text (color)
- decoration (text-decoration-color)
- border (border-color)
- border-x, border-y, border-t, border-r, border-b, border-l
- outline (outline-color)
- accent (accent-color)
- caret (caret-color)
- fill
- stroke
- shadow
- ring, ring-offset
- divide
