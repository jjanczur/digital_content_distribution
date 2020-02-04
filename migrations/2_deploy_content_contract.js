const DappToken = artifacts.require("DappToken.sol");

const SLAContract = artifacts.require(
  "./SLAContract.sol"
);
const ContentContractFactory = artifacts.require(
  "./ContentContractFactory.sol"
);

module.exports = async function(deployer, network, accounts) {
  const _name = "Romeo and Juliet by William Shakespeare";
  const _symbol = "RJWS";
  const _decimals = 0;
  ROMEO_AND_JULIET_HASH_SHA256 =
    "C63A0215532664843CD2C7F7F05AD1C54ECD499AF055668F0C8352AC67A15CDA";

  const _name2 = "Hamlet by William Shakespeare";
  const _symbol2 = "HWS";
  const _decimals2 = 0;
  HAMLET_HASH_SHA256 =
    "33F63D2C1FCE59B60FE10682F98CA30B72BC06DC54D2EBDE8DCF3D9CF0C2B16B";

  const [owner, ...otherAccounts] = accounts;

  const creatorCompensation = 100000; // wei 1e5
  const currentPrice = 1000000; // wei 1e6
  const merchant = accounts[1];

  const deliverer = accounts[2];
  const delivererCompensation = 100000; // wei 1e5
  const keyAuthority = accounts[3];
  const keyAuthorityCompensation = 100000; // wei 1e5

  // Deploy Romeo & Julia
  await deployer.deploy(ContentContractFactory, _name, _symbol, _decimals, {
    from: owner
  });
  const romeoFactory = await ContentContractFactory.deployed();
  console.log(`ROMEO_FACTORY = ${romeoFactory.address}`);
  console.log(`ROMEO_TOKEN = ${await romeoFactory.tokenAddress()}`);

  await romeoFactory.deployContentContract(
    merchant,
    ROMEO_AND_JULIET_HASH_SHA256,
    creatorCompensation,
    currentPrice,
    {
      from: owner
    }
  );

  const contractAddressArrayRomeo = await romeoFactory.getContractsByAddress();

  const romeoContract = await SLAContract.at(
    contractAddressArrayRomeo[0]
  );
  console.log(`ROMEO_CONTRACT = ${romeoContract.address}`);

  await romeoContract.setDeliverer(deliverer, {
    from: merchant
  });
  await romeoContract.setDelivererCompensation(delivererCompensation, {
    from: merchant
  });
  await romeoContract.setKeyAuthority(keyAuthority, {
    from: merchant
  });
  await romeoContract.setKACompensation(keyAuthorityCompensation, {
    from: merchant
  });

  // Deploy Hamlet

  await deployer.deploy(ContentContractFactory, _name2, _symbol2, _decimals2, {
    from: owner
  });
  const hamletFactory = await ContentContractFactory.deployed();

  console.log(`HAMLET_FACTORY = ${hamletFactory.address}`);
  console.log(`HAMLET_TOKEN = ${await hamletFactory.tokenAddress()}`);

  await hamletFactory.deployContentContract(
    merchant,
    ROMEO_AND_JULIET_HASH_SHA256,
    creatorCompensation,
    currentPrice,
    {
      from: owner
    }
  );

  const contractAddressArrayHamlet = await hamletFactory.getContractsByAddress();

  const hametContract = await SLAContract.at(
    contractAddressArrayHamlet[0]
  );

  await hametContract.setDeliverer(deliverer, {
    from: merchant
  });
  await hametContract.setDelivererCompensation(delivererCompensation, {
    from: merchant
  });
  await hametContract.setKeyAuthority(keyAuthority, {
    from: merchant
  });
  await hametContract.setKACompensation(keyAuthorityCompensation, {
    from: merchant
  });

  console.log(`HAMLET_CONTRACT = ${hametContract.address}`);
};
