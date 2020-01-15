# @ianwalter/bsl
> A module and CLI that makes using [BrowserStack Local][bsUrl] easy

[![npm page][npmImage]][npmUrl]

## Installation

```console
yarn add @ianwalter/bsl --dev
```

## Usage

As a [GitHub Action][actionsUrl]:

```yaml
- name: Test
  uses: ianwalter/bsl@v2.1.0
  with:
    args: yarn test
  env:
    BROWSERSTACK_ACCESS_KEY: ${{ secrets.BROWSERSTACK_ACCESS_KEY }}
    BROWSERSTACK_USERNAME: ${{ secrets.BROWSERSTACK_USERNAME }}
```

## Related

* [`@ianwalter/bff-webdriver`][bffWebdriverUrl] - A [bff][bffUrl] plugin to
  enable WebDriver-based testing

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[bsUrl]: https://www.browserstack.com/local-testing
[npmImage]: https://img.shields.io/npm/v/@ianwalter/bsl.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/bsl
[actionsUrl]: https://github.com/features/actions
[bffWebdriverUrl]: http://github.com/ianwalter/bff-webdriver
[bffUrl]: http://github.com/ianwalter/bff
[licenseUrl]: https://github.com/ianwalter/bsl/blob/master/LICENSE
