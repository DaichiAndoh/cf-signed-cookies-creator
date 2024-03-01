const cannedPolicyFn = require('./cannedPolicy.js');
const customPolicyFn = require('./customPolicy.js');

const policyType = process.argv[2];

if (!policyType) {
  throw new Error('使用するポリシーを指定してください。');
}

if (policyType === 'cannedPolicy') cannedPolicyFn();
else if (policyType === 'customPolicy') customPolicyFn();
else throw new Error('指定されたポリシーが不適切です。');
