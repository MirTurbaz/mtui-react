# mtui-react
    "mtui-react": "ssh://git@github.com/MirTurbaz/mtui-react.git"

## Next + mtui-react

Некоторые элементы пакета необходимо импортировать в Next-приложении следующим образом:

```ts
import dynamic from 'next/dynamic';
const Wysiwyg = dynamic(() => import('mtui-react/wysiwyg').then((mod) => mod.Wysiwyg), { ssr: false });
```
