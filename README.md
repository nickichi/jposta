# jposta
Modern library for Japanese postal code to address.
[日本語の補足はこちら](#-補足)。

## Features
⚡ Simple usage with compatibility for modern frameworks <br />
⚡ No dependencies <br />
⚡ Self-hosted & dynamic import (no implicit API calls)

## Installation
```bash
$ npm install jposta
```

## Usage
```javascript
import { getAddress } from 'jposta';

// pass zip code as string
const address = getAddress('1000001');
console.log(address);
// { pref: "東京都", prefNum: 13, city: "千代田区", town: "千代田" }

// also you can pass zip code with hyphen
const address2 = getAddress('100-0003');
console.log(address2);
// { pref: "東京都", prefNum: 13, city: "千代田区", town: "皇居外苑" }
```

## Dynamic Import
jposta needs to host the data file on your project.

```bash
# Your project build
$ npm run build

> vite-react-jposta@0.0.0 build
> tsc && vite build

vite v5.2.13 building for production...
✓ 136 modules transformed.
dist/index.html                         0.46 kB │ gzip:  0.30 kB
dist/assets/react-CHdo91hT.svg          4.13 kB │ gzip:  2.05 kB
dist/assets/index-DiwrgTda.css          1.39 kB │ gzip:  0.72 kB
dist/assets/z11-nic1O4vt-B_L_y_VH.js    2.29 kB │ gzip:  0.95 kB
dist/assets/z96-Br2qdTMP-DG7Gpu3V.js   80.14 kB │ gzip: 27.45 kB
...(many files)
dist/assets/z50-BWUSdQBW-BJcxw7Xg.js   87.66 kB │ gzip: 29.14 kB
dist/assets/z60-34YubQWJ-DwuyaedM.js  101.50 kB │ gzip: 29.97 kB
dist/assets/index-D0vWSNxA.js         152.48 kB │ gzip: 49.62 kB
✓ built in 2.16s
```

...and then you can import the data file dynamically.

```javascript
const result1 = getAddress('1000001');
// then import the data file named like z10.js
const result2 = getAddress('2100002');
// then import the data file named like z21.js
const result3 = getAddress('1000003');
// then return data without additional import
```

## Configuration
WIP

## Samples
Vite + React + jposta ([source code](https://github.com/nickichi/vite-react-jposta)):
https://nickichi.github.io/vite-react-jposta/

## License
see [LICENSE](./LICENSE)

---

## 補足
- 郵便番号と住所は、[日本郵便株式会社の郵便番号データ](https://www.post.japanpost.jp/zipcode/download.html)を利用しています
- このライブラリは self-hosted な郵便番号検索を提供するために作成されました。外部APIを使用せず、バックエンドも不要です。ただし、ホストするアセットが100増えます。