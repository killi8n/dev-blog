---
title: "About Bitcoin"
spoiler: "About Bitcoin"
date: "2019-01-16"
---

# 비트코인 채굴하기

## 채굴 (mining)

- 채굴 노드는 비트코인의 합의규칙 (consensus rule) 을 참조해서 모든 거래를 입증한다.
- 채굴과정에서 유효하지 않거나 형식이 잘못된 거래가 거부됨으로써 비트코인 거래에 대한 신뢰도가 생긴다.

# 비트코인 코어: 참조구현

```bash
$ git clone https://github.com/bitcoin/bitcoin.git
$ cd bitcoin
$ git tag
$ git checkout v0.11.2
$ git status
$ brew install autoconf automake berkeley-db4 libtool boost miniupnpc openssl pkg-config protobuf qt5
$ brew install librsvg
$ more doc/build-osx.md
$ ./autogen.sh
$ ./configure LDFLAGS='-L/usr/local/opt/openssl/lib' CPPFLAGS='-I/usr/local/opt/openssl/include' PKG_CONFIG_PATH='/usr/local/opt/openssl/lib/pkgconfig' --with-gui=qt5
$ make
```
