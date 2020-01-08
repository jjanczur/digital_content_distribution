pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DigitalContentContract.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ContentContractFactory is Ownable{
    DappToken public token;
    address[] public deployedContracts;


  // With the construction of the factory the digital token contract will be deployed
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
        public
    {
        token = new DappToken(_name, _symbol, _decimals);
    //   owner = msg.sender;
    //   token.addMinter(owner);
    }


  /**
  * @dev Allows owner to create digital content contract for the merchant
  * @param merchant Address of a Merchant
  * @param dcHash Hash of the digital content
  * @param creatorCompensation Compensation of the creator
  * @param currentPrice Address of a merchant
  */
    function deployContentContract(address merchant,
        string memory dcHash,
        uint256 creatorCompensation,
        uint256 currentPrice) public onlyOwner {

        DigitalContentContract contentContract = new DigitalContentContract(
            merchant,
            owner(),
            dcHash,
            creatorCompensation,
            currentPrice,
            token);

        // Add new contract to an array
        deployedContracts.push(address(contentContract));

        // With the creation of the new contract by the owner give this contract a minter role to mint a tokens
        token.addMinter(address(contentContract));
    }

    function getContractsByAddress() public view returns (address[] memory) {
        return deployedContracts;
    }

}