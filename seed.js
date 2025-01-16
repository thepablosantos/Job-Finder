// seed.js
const db = require('./db/connection');
const Job = require('./models/Job');

async function seed() {
  try {
    await db.sync({ force: true });

    // Insere vagas relacionadas a Web3
    await Job.create({
      title: 'Web3 Front-End',
      description: 'Develop responsive DApp interfaces using React and Tailwind. Integrate with smart contracts via ethers.js.',
      salary: '3500 USD / 0.04 BTC',
      company: 'BlockFi Solutions',
      email: 'pablo@dev.com',
      new_job: 1
    });

    await Job.create({
      title: 'Smart Contract Developer (Solidity)',
      description: 'Build secure Solidity smart contracts on Ethereum, focusing on DeFi protocols.',
      salary: '5000 USD / 0.051 BTC',
      company: 'DeFi Core Labs',
      email: 'pablo@dev.com',
      new_job: 1
    });

    await Job.create({
      title: 'Full Stack Web3 Developer',
      description: 'Create end-to-end blockchain solutions, from smart contracts to front-end DApps.',
      salary: '4500 USD / 0.05 BTC',
      company: 'Crypto Innovators',
      email: 'pablo@dev.com',
      new_job: 0
    });

    await Job.create({
      title: 'Blockchain Engineer',
      description: 'Implement NFT minting logic, marketplace contracts, and meta-transactions on EVM-compatible networks.',
      salary: '10000 USD / 0.11 BTC',
      company: 'Satoshi Labs',
      email: 'pablo@dev.com',
      new_job: 1
    });

    console.log('Seeded database with Web3 jobs!');
    process.exit();
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
}

seed();