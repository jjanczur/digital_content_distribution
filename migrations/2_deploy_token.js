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
  const _decimals = 0; //new BN(0); // You can't have half of digital content = no decimal points

  // deployer.deploy(DappToken, _name, _symbol, _decimals);
  await deployer.deploy(ContentContractFactory, _name, _symbol, _decimals);
  const deployedToken = await ContentContractFactory.deployed();
};
