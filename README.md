# cf-signed-cookies-creator &middot; ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

[Amazon CloudFront](https://aws.amazon.com/jp/cloudfront/)の署名付きCookieを作成するプログラムです。

## Usage

### 1. ライブラリインストール

```
$ cd cf-signed-cookies-creator
$ npm ci
```

### 2. 環境変数設定

プロジェクトルートに `.env` を作成します。

```
$ cd cf-signed-cookies-creator
$ touch .env
```

`.env` にはCloudFrontのドメインとパブリックキーのIDを設定します。

```
CLOUD_FRONT_DISTRIBUTION_DOMAIN=*****
KEY_PAIR_ID=*****
```

### 3. プログラム実行

`index.js` の実行時にコマンドライン引数でポリシータイプを指定すると、
指定したポリシーに対応した署名付きCookieを作成します。

コマンドライン引数で指定できる値は以下です。

- 規定ポリシー: `cannedPolicy`
- カスタムポリシー: `customPolicy`

```
$ cd cf-signed-cookies-creator
$ node index.js {policy-type}
```
