# Changelog

## 0.12.0 (2026-11-02)

### ⚠ BREAKING CHANGES

* the package is renamed from @armscye/logging to
  @armscye/logger. It is ESM-only with an exports map and requires Node.js
  22.12 or later. CommonJS consumers need the resolution-mode import
  attribute or "module": "nodenext". Logger methods now take msg as unknown
  and return unknown instead of any.

### Features

* publish as a standalone ESM package ([9e33850](https://github.com/armscye/logger/commit/9e33850c4943b1671e3e62769030cdab39f6b1a3))
