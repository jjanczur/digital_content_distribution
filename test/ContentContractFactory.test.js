const { accounts, contract } = require("@openzeppelin/test-environment");
const { BN } = require("@openzeppelin/test-helpers");

require("@openzeppelin/test-helpers");
const { shouldBehaveLikeOwnable } = require("./Ownable.behavior");

const ContentContractFactory = contract.fromArtifact("ContentContractFactory");

describe("Contract: ContentContractFactory", function() {
  const _name = "Digital Content Token";
  const _symbol = "DCT";
  const _decimals = new BN(0);

  const [owner, ...otherAccounts] = accounts;

  // beforeEach(async function() {
  //   this.ownable = await ContentContractFactory.new({ from: owner });
  // });
  beforeEach(async function() {
    this.ownable = await ContentContractFactory.new(_name, _symbol, _decimals, {
      from: owner
    });
  });

  shouldBehaveLikeOwnable(owner, otherAccounts);
});
