const main = async () => {
  const gameConractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameConractFactory.deploy(
    ['Kratos', 'Sora', 'Jak'],
    [
      'https://i.imgur.com/KT4MJiI.png',
      'https://i.imgur.com/D9RuUt6.png',
      'https://i.imgur.com/Pv96rgv.png',
    ],
    [10000, 6500, 8000],
    [1500, 1200, 1000],
    'Ultra Instinct Shaggy',
    'https://imgur.com/TwLVYXv.png',
    1000000,
    2000
  );
  await gameContract.deployed();
  console.log('contract deployed to:', gameContract.address);
  let txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log('Token URI:', returnedTokenUri);

  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.warn(error);
    process.exit(1);
  }
};

runMain();
