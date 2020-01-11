const {
  constants,
  expectEvent,
  expectRevert
} = require("@openzeppelin/test-helpers");
const { ZERO_ADDRESS } = constants;

const { expect } = require("chai");

function shouldBehaveLikeOwnable(owner, [other]) {
  describe("as an ownable", function() {
    it("should have an owner", async function() {
      expect(await this.factory.owner()).to.equal(owner);
    });

    it("changes owner after transfer", async function() {
      expect(
        await this.factory.isOwner({ from: other })
      ).to.equal(false);
      const receipt = await this.factory.transferOwnership(
        other,
        {
          from: owner
        }
      );
      expectEvent(receipt, "OwnershipTransferred");

      expect(await this.factory.owner()).to.equal(other);
      expect(
        await this.factory.isOwner({ from: other })
      ).to.equal(true);
    });

    it("should prevent non-owners from transferring", async function() {
      await expectRevert(
        this.factory.transferOwnership(other, { from: other }),
        "Ownable: caller is not the owner"
      );
    });

    it("should guard ownership against stuck state", async function() {
      await expectRevert(
        this.factory.transferOwnership(ZERO_ADDRESS, {
          from: owner
        }),
        "Ownable: new owner is the zero address"
      );
    });

    it("loses owner after renouncement", async function() {
      const receipt = await this.factory.renounceOwnership({
        from: owner
      });
      expectEvent(receipt, "OwnershipTransferred");

      expect(await this.factory.owner()).to.equal(ZERO_ADDRESS);
    });

    it("should prevent non-owners from renouncement", async function() {
      await expectRevert(
        this.factory.renounceOwnership({ from: other }),
        "Ownable: caller is not the owner"
      );
    });
  });
}

module.exports = {
  shouldBehaveLikeOwnable
};
