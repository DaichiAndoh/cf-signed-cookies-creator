const { getSignedCookies } = require("@aws-sdk/cloudfront-signer");
const fs = require('fs');
require('dotenv').config();

function createSignedCookies() {
  const cloudfrontDistributionDomain = process.env.CLOUD_FRONT_DISTRIBUTION_DOMAIN;
  const s3ObjectKey = "private-content/private.jpeg";
  const url = `${cloudfrontDistributionDomain}/${s3ObjectKey}`;
  const privateKey = fs.readFileSync('./keypair/private_key.pem');
  const keyPairId = process.env.KEY_PAIR_ID;
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const dateLessThan = `${year}-${month}-${day}`;
  
  const signedCookies = getSignedCookies({
    url,
    keyPairId,
    dateLessThan,
    privateKey,
  });
  console.log(signedCookies);
}

module.exports = createSignedCookies;
