---
title: "Crypto Module"
spoiler: "javascript's encryption, decryption"
date: "2020-01-31"
---

# 자바스크립트의 암호화

## module Crypto

```bash
$ yarn add crypto
```

## 단방향 암호화

- 키를 사용하여 복호화 시킬수 없는 암호화 방식을 단방향 암호화 라고 한다.
- ex) hash

### crypto.createHmac(algorithm, key[, options])

`algorithm`: 'sha256', 'sha512' 등의 알고리즘 값이 문자열로 들어간다. `openssl list -digest-algorithm` 명령어를 통해, 각 상황에 필요한 알고리즘들을 구경할 수 있다. (구버전 openssl 에서는 `openssl list-message-digest-algorithms`)

`key`: secretKey 값.

```js
import crypto from "crypto"

const secretKey = "1234#$%%"
const pure = "abcdefg"

const hmac = crypto.createHmac("sha256", secretKey)
// hmac 변수에 저장된 값은, Hmac 클래스 값이다.
// 따라서 crypto.createHmac 함수를 실행하면,
// Hmac 클래스값을 반환시킨다.
const encrypted = hmac.update(pure).digest("hex")
console.log(encrypted)
// Hmac 클래스의 update() 메서드를 통해 data(이곳에서는 pure라는 string)값을 base64, hex, latin1 의 방식중
// 하나를 택하여 digest를 통해 string 문자열로 반환 한다.
```

### crypto.createHash(algorithm[, options])

`algorithm`: 'sha256', 'sha512' 등의 알고리즘 값이 문자열로 들어간다. `openssl list -digest-algorithms` 명령어를 통해, 각 상황에 필요한 알고리즘들을 구경할 수 있다. (구버전 openssl 에서는 `openssl list-message-digest-algorithms`)

```js
import crypto from "crypto"

const secretKey = "1234#$%%"
const pure = "abcdefg"

const hash = createHash("sha256")
// hash 변수에 저장된 값은, Hash 클래스 값이다.
// 따라서 crypto.createHash 함수를 실행하면,
// Hash 클래스값을 반환시킨다.
const encrypted = hash.update(pure).digest("hex")
console.log(encrypted)
// Hash 클래스의 update() 메서드를 통해 data(이곳에서는 pure라는 string)값을 base64, hex, latin1 의 방식중
// 하나를 택하여 digest를 통해 string 문자열로 반환 한다.
```

## 양방향 암호화

- 키를 사용하여 복호화 시킬수 있는 암호화 방식을 양방향 암호화 라고 한다.
- ex) aes

### createCipherIv(algorithm, key, iv[,options])

원래 사용하던 createCipher 는 deprecated 되었다고 한다. 따라서 예제는, createCipherIv 를 사용하여 만들었다.

`altorithm`: 'aes-256-gcm', 'aes-256-cbc' 등의 알고리즘. `openssl list -cipher-algorithms` 명령어를 통해 알고리즘들을 구경가능하다. (구버전 openssl 에서는 `openssl list-cipher-algorithms`)

`key`: 암, 복호화에 사용되는 CipherKey 이다.

`iv`: initialization vector. utf8로 인코딩된 string 이거나 buffer, TypeArray, DataView 타입을 가진다. cipher가 iv를 필요로 하지않는다면, null로 대체 가능.

```js
import crypto from "crypto"

const SECRET_KEY = "abcd"
const IV = "1234"
const pureString = "hello world"

const cipher = crypto.createCipheriv(
  "aes-256-gcm",
  Buffer.alloc(32, SECRET_KEY, "binary"),
  Buffer.alloc(16, IV, "binary")
)
// 마찬가지로, CipherIv 클래스가 cipher 변수에 저장된다.
let encrypted = cipher.update(pureString, "utf8", "hex")
// 평문을 'utf8'로 인코딩 하고, 'hex'로 아웃풋을 내놓는다.
console.log(encrypted) // 064f193376da4fc2815b47
```

### createDecipherIv(algorithm, key, iv[,options])

`altorithm`: 'aes-256-gcm', 'aes-256-cbc' 등의 알고리즘. `openssl list -cipher-algorithms` 명령어를 통해 알고리즘들을 구경가능하다. (구버전 openssl 에서는 `openssl list-cipher-algorithms`)

`key`: 암, 복호화에 사용되는 CipherKey 이다.

`iv`: initialization vector. utf8로 인코딩된 string 이거나 buffer, TypeArray, DataView 타입을 가진다. cipher가 iv를 필요로 하지않는다면, null로 대체 가능.

```js
import crypto from "crypto"

const SECRET_KEY = "abcd"
const IV = "1234"
const pureString = "hello world"

const cipher = crypto.createCipheriv(
  "aes-256-gcm",
  Buffer.alloc(32, SECRET_KEY, "binary"),
  Buffer.alloc(16, IV, "binary")
)
let encrypted = cipher.update(pureString, "utf8", "hex")
console.log(encrypted) // 064f193376da4fc2815b47

const decipher = crypto.createDecipheriv(
  "aes-256-gcm",
  Buffer.alloc(32, SECRET_KEY, "binary"),
  Buffer.alloc(16, IV, "binary")
)
// DecipherIv 라는 클래스를 반환하여 decipher 변수에 저장.

let decrypted = decipher.update(encrypted, "hex", "utf8")
// 위에서 암호화된 output이 'hex' 값이므로, 'hex'로 인코딩을 한후, 'utf8'로 복호화한 값을 내보낸다.
// 암호화하는 인코딩 순서와 복호화 인코딩 하는 순서가 다르다면 (reverse가 아니라면), 정확한 복호화된 문자열이 반환되지 않는다.
// 암호화 인코딩 순서 : utf8(input encoding) -> hex(output encoding) 라면,
// 복호화 인코딩 순서: hex(input encoding) -> utf8(output encoding)
// 위와같이 input과 output의 인코딩이 역순으로 되어야 정확한 복호화가 가능하다.
console.log(decrypted) // hello world
```
