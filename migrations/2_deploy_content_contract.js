const DappToken = artifacts.require("DappToken.sol");

const DigitalContentContract = artifacts.require(
  "./DigitalContentContract.sol"
);
const ContentContractFactory = artifacts.require(
  "./ContentContractFactory.sol"
);

const ether = n => new web3.BigNumber(web3.toWei(n, "ether"));

const duration = {
  seconds: function(val) {
    return val;
  },
  minutes: function(val) {
    return val * this.seconds(60);
  },
  hours: function(val) {
    return val * this.minutes(60);
  },
  days: function(val) {
    return val * this.hours(24);
  },
  weeks: function(val) {
    return val * this.days(7);
  },
  years: function(val) {
    return val * this.days(365);
  }
};

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

  await deployer.deploy(ContentContractFactory, _name, _symbol, _decimals, {
    from: owner
  });
  const factory = await ContentContractFactory.deployed();

  await factory.deployContentContract(
    merchant,
    dcHash,
    creatorCompensation,
    currentPrice
  );

  const contractAddressArray = await factory.getContractsByAddress();

  contract = await DigitalContentContract.at(contractAddressArray[0]);

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
