const DappToken = artifacts.require("DappToken.sol");

const DigitalContentContract = artifacts.require(
  "./DigitalContentContract.sol"
);
const ContentContractFactory = artifacts.require(
  "./ContentContractFactory.sol"
);

const CreatorFactory = artifacts.require("./CreatorFactory.sol");



module.exports = async function(deployer, network, accounts) {
  const _name = "Digital Content Token";
  const _symbol = "DCT";
  const _decimals = 0;
  const [owner, ...otherAccounts] = accounts;

  const dcHash = "Digital content hash";
  const creatorCompensation = 100000; // wei 1e5
  const currentPrice = 1000000; // wei 1e6
  const merchant = accounts[1];

  const deliverer = accounts[2];
  const delivererCompensation = 100000; // wei 1e5
  const keyAuthority = accounts[3];
  const keyAuthorityCompensation = 100000; // wei 1e5

  await deployer.deploy(CreatorFactory, {
    from: owner
  });

  const creatorFactory = await CreatorFactory.deployed();

  await creatorFactory.deployContentFactory(_name, _symbol, _decimals);
  
  const factoryAddressArray = await creatorFactory.getContractsByAddress();

  let factory = await ContentContractFactory.at(factoryAddressArray[0]);

  await factory.deployContentContract(
    merchant,
    dcHash,
    creatorCompensation,
    currentPrice
  );

  const contractAddressArray = await factory.getContractsByAddress();

  let contract = await DigitalContentContract.at(contractAddressArray[0]);

  await contract.setDeliverer(deliverer, {
    from: merchant
  });
  await contract.setDelivererCompensation(delivererCompensation, {
    from: merchant
  });
  await contract.setKeyAuthority(keyAuthority, {
    from: merchant
  });
  await contract.setKACompensation(keyAuthorityCompensation, {
    from: merchant
  });
};;
