require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

//This task lists the account's balance
task('balance', 'Checks the account balance')
  .addParam(
    'account',
    'The account address to check the balance for',
    undefined,
    types.string
  )
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const balance = await ethers.provider.getBalance(taskArgs.account);
    console.log(ethers.utils.formatEther(balance), 'ETH');
  });
/**
 * @type import('hardhat/config').HardhatUserConfig
 * module exported to hardhat
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
