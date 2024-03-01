const { getSignedCookies } = require("@aws-sdk/cloudfront-signer");
const fs = require('fs');
require('dotenv').config();

function createSignedCookies() {
  const cloudfrontDistributionDomain = process.env.CLOUD_FRONT_DISTRIBUTION_DOMAIN;
  const privateKey = fs.readFileSync('./keypair/private_key.pem');
  const keyPairId = process.env.KEY_PAIR_ID;
  
  // アクセス日中は有効にする
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const epochTime = Math.round(tomorrow.getTime() / 1000);
  
  /**
   * カスタムポリシー
   * 全てのコンテンツを署名付きCookieの対象とする
   */
  const policy = JSON.stringify({
    Statement: [
      {
        Resource: `${cloudfrontDistributionDomain}/*`,
        Condition: {
          DateLessThan: {
            "AWS:EpochTime": epochTime,
          },
        },
      },
    ],
  });
  
  const signedCookies = getSignedCookies({
    privateKey,
    keyPairId,
    policy,
    url: '',
  });
  console.log(signedCookies);
}

module.exports = createSignedCookies;
