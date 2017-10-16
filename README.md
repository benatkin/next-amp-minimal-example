# next-amp-minimal-example

This example has two pages, `/` and `/about`, which have
[AMP](https://www.ampproject.org/) versions available by
adding `?amp=1` to the URLs. These are linked in the
header of the non-AMP pages with `<link rel="amphtml">`.

## running in dev

``` bash
npm run dev
```

## running in production

``` bash
npm run build && npm start
```

## deploying

``` bash
now
```

## validating the AMP

``` bash
npm install -g amphtml-validator
amphtml-validator 'http://localhost:3000/?amp=1'
amphtml-validator 'http://localhost:3000/about?amp=1'
```