const ContentContractFactory = artifacts.require("ContentContractFactory");
const DappToken = artifacts.require("DappToken");
const DigitalContentContract = artifacts.require("DigitalContentContract");

const { shouldBehaveLikeOwnable } = require("./Ownable.behavior");

const BigNumber = web3.BigNumber;

const {
  constants,
  expectEvent,
  expectRevert,
  BN
} = require("@openzeppelin/test-helpers");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("ContentContractFactory", accounts => {
  const _name = "Digital Content Token";
  const _symbol = "DCT";
  const _decimals = 0;

  const [owner, ...otherAccounts] = accounts;

  const creator = accounts[0];

  const dcHash = "Digital content hash";
  const creatorCompensation = new BN(100000); // wei 1e5
  const currentPrice = new BN(1000000); // wei 1e6
  const merchant = accounts[1];

  const deliverer = accounts[2];
  const delivererCompensation = new BN(200000); // wei 2 * 1e5
  const keyAuthority = accounts[3];
  const keyAuthorityCompensation = new BN(300000); // wei 3 * 1e5
  const buyer = accounts[4];

  beforeEach(async function() {
    this.factory = await ContentContractFactory.new(_name, _symbol, _decimals, {
      from: owner
    });

    this.tokenAddress = await this.factory.tokenAddress();

    this.token = await DappToken.at(this.tokenAddress);

    await this.factory.deployContentContract(
      merchant,
      dcHash,
      creatorCompensation,
      currentPrice
    );

    this.contractAddressArray = await this.factory.getContractsByAddress();
    this.contract = await DigitalContentContract.at(
      this.contractAddressArray[0]
    );

    await this.contract.setDeliverer(deliverer, {
      from: merchant
    });
    await this.contract.setKeyAuthority(keyAuthority, {
      from: merchant
    });
    await this.contract.setKACompensation(keyAuthorityCompensation, {
      from: merchant
    });
    await this.contract.setDelivererCompensation(delivererCompensation, {
      from: merchant
    });
  });

  describe("on setDeliverer()", () => {
    it("should set deliverer", async function() {
      deliverer.should.equal(await this.contract.deliverer());
    });
    it("should be called only by the merchant", async function() {
      await expectRevert(
        this.contract.setDeliverer(keyAuthority, { from: keyAuthority }),
        "Only merchant can call this function"
      );
    });
  });

  describe("on setKeyAuthority()", () => {
    it("should set key authority", async function() {
      keyAuthority.should.equal(await this.contract.keyAuthority());
    });
    it("should be called only by the merchant", async function() {
      await expectRevert(
        this.contract.setDeliverer(deliverer, { from: deliverer }),
        "Only merchant can call this function"
      );
    });
  });

  describe("on setDelivererCompensation()", () => {
    it("should set deliverer compensation", async function() {
      (await this.contract.delivererCompensation()).should.be.a.bignumber.equal(
        delivererCompensation
      );
    });
    it("should be called only by the merchant", async function() {
      await expectRevert(
        this.contract.setDelivererCompensation(keyAuthorityCompensation, {
          from: deliverer
        }),
        "Only merchant can call this function"
      );
    });
  });

  describe("on setKACompensation()", () => {
    it("should set key authority compensation", async function() {
      (
        await this.contract.keyAuthorityCompensation()
      ).should.be.a.bignumber.equal(keyAuthorityCompensation);
    });
    it("should be called only by the merchant", async function() {
      await expectRevert(
        this.contract.setKACompensation(delivererCompensation, {
          from: deliverer
        }),
        "Only merchant can call this function"
      );
    });
  });

  describe("on setCurrentPrice()", () => {
    it("should set current price", async function() {
      (await this.contract.currentPrice()).should.be.a.bignumber.equal(
        currentPrice
      );
    });

    it("should not allow to set current price lower than third parties compensations", async function() {
      const newPrice = 0;
      await expectRevert(
        this.contract.setCurrentPrice(newPrice, {
          from: merchant
        }),
        "new price cannot be lower than the sum of the involved parties compensation"
      );
    });

    it("should be called only by the merchant", async function() {
      await expectRevert(
        this.contract.setKACompensation(delivererCompensation, {
          from: deliverer
        }),
        "Only merchant can call this function"
      );
    });
  });

  describe("on buy()", () => {
    it("should compensate the creator", async function() {
      const oldBalanceCreator = await web3.eth.getBalance(creator);
      await this.contract.buy({
        value: currentPrice,
        from: buyer
      }).should.be.fulfilled;
      const newBalanceCreator = await web3.eth.getBalance(creator);
      Number(newBalanceCreator).should.be.above(Number(oldBalanceCreator));
    });
    it("should compensate the deliverer", async function() {
      const oldBalanceDeliverer = await web3.eth.getBalance(deliverer);
      await this.contract.buy({
        value: currentPrice,
        from: buyer
      }).should.be.fulfilled;
      const newBalanceDeliverer = await web3.eth.getBalance(deliverer);
      Number(newBalanceDeliverer).should.be.above(Number(oldBalanceDeliverer));
    });
    it("should compensate the merchant", async function() {
      const oldBalanceMerchant = await web3.eth.getBalance(merchant);
      await this.contract.buy({
        value: currentPrice,
        from: buyer
      }).should.be.fulfilled;
      const newBalanceMerchant = await web3.eth.getBalance(merchant);
      Number(newBalanceMerchant).should.be.above(Number(oldBalanceMerchant));
    });
    it("should compensate the key authority", async function() {
      const oldBalanceKeyAuthority = await web3.eth.getBalance(keyAuthority);
      await this.contract.buy({
        value: currentPrice,
        from: buyer
      }).should.be.fulfilled;
      const newBalanceKeyAuthority = await web3.eth.getBalance(keyAuthority);
      Number(newBalanceKeyAuthority).should.be.above(
        Number(oldBalanceKeyAuthority)
      );
    });

    it("should issue a token", async function() {
      const oldBalance = await this.token.balanceOf(buyer);
      const originalTotalSupply = await this.token.totalSupply();
      await this.contract.buy({
        value: currentPrice,
        from: buyer
      }).should.be.fulfilled;
      const newBalance = await this.token.balanceOf(buyer);
      const newTotalSupply = await this.token.totalSupply();
      Number(newBalance).should.be.above(Number(oldBalance));
      Number(newTotalSupply).should.be.above(Number(originalTotalSupply));
    });
  });
});

// contract.setDeliverer(deliverer, {
//   from: merchant
// });
// contract.setDelivererCompensation(delivererCompensation, {
//   from: merchant
// });
// contract.setKeyAuthority(keyAuthority, {
//   from: merchant
// });
// contract.setKACompensation(keyAuthorityCompensation, {
//   from: merchant
// });
