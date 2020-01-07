const { BN } = require("openzeppelin-test-helpers");

const { expect } = require("chai");

const DappToken = artifacts.require("DappToken");

contract("DappToken", function() {
  const _name = "Digital Content Token";
  const _symbol = "DCT";
  const _decimals = new BN(0);

  beforeEach(async function() {
    this.detailedERC20 = await DappToken.new(_name, _symbol, _decimals);
  });

  it("has a name", async function() {
    expect(await this.detailedERC20.name()).to.equal(_name);
  });

  it("has a symbol", async function() {
    expect(await this.detailedERC20.symbol()).to.equal(_symbol);
  });

  it("has an amount of decimals", async function() {
    expect(await this.detailedERC20.decimals()).to.be.bignumber.equal(
      _decimals
    );
  });
});
