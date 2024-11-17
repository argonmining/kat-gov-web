import pkg from 'crypto-js';
const { SHA256 } = pkg;

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password as a command line argument');
  process.exit(1);
}

const hash = SHA256(password).toString();

console.log('\nPassword Hash Generated:');
console.log('------------------------');
console.log(hash);
console.log('\nAdd this to your .env file as:');
console.log(`VITE_MANAGEMENT_PASSWORD_HASH=${hash}\n`);