pragma solidity ^0.5.0;

import "./ContentContractFactory.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CreatorFactory is Ownable{
    address[] public deployedContracts;

  // With the construction of the factory the digital token contract will be deployed
    constructor()
        public
        Ownable()
    {}

      /**
  * @dev Allows owner to create digital content contract for the merchant
  * @param _name Name of the new token for new content
  * @param _symbol Symbol of a new token
  * @param _decimals Number of decimal places in a new token
  */
    function deployContentFactory(string memory _name, string memory _symbol, uint8 _decimals) public onlyOwner returns (address) {

        ContentContractFactory contentFactory = new ContentContractFactory(_name, _symbol, _decimals, msg.sender);
        contentFactory.transferOwnership(msg.sender);
        // Add new contract to an array
        deployedContracts.push(address(contentFactory));
        return address(contentFactory);
    }

    function getContractsByAddress() public view returns (address[] memory) {
        return deployedContracts;
    }

}