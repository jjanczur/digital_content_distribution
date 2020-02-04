const ContentContractFactory = artifacts.require("ContentContractFactory");
const DappToken = artifacts.require("DappToken");
const SLAContract = artifacts.require("SLAContract");
const { shouldBehaveLikeOwnable } = require("./Ownable.behavior");

require("chai").should();

contract("ContentContractFactory", accounts => {
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

  beforeEach(async function() {
    this.factory = await ContentContractFactory.new(_name, _symbol, _decimals, {
      from: owner
    });

    this.tokenAddress = await this.factory.tokenAddress();

    this.token = await DappToken.at(this.tokenAddress);
  });

  describe("with a constructor", () => {
    it("should create a token", async function() {
      this.tokenAddress.should.equal(this.token.address);
    });
    it("new token should have a correct name", async function() {
      expect(await this.token.name()).to.equal(_name);
    });
  });

  shouldBehaveLikeOwnable(owner, otherAccounts);

  describe("creating content contract", () => {
    it("should create a content contract", async function() {
      await this.factory.deployContentContract(
        merchant,
        dcHash,
        creatorCompensation,
        currentPrice
      );

      const contractAddressArray = await this.factory.getContractsByAddress();
      const contractAddress = contractAddressArray[0];

      const contract = await SLAContract.at(contractAddress);

      contractAddress.should.equal(contract.address);
    });
  });
});
