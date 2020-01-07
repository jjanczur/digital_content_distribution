const DappToken = artifacts.require("DappToken.sol");

module.exports = function(deployer) {
  const _name = "Digital Content Token";
  const _symbol = "DCT";
  const _decimals = new BN(0); // You can't have half of digital content = no decimal points

  // deployer.deploy(DappToken, _name, _symbol, _decimals);
  await deployer.deploy(DappToken, _name, _symbol, _decimals);
  const deployedToken = await DappToken.deployed();
};
