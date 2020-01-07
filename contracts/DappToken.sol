pragma solidity 0.5.12;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract DappToken is ERC20Mintable, ERC20Detailed {
 constructor(string memory _name, string memory _symbol, uint8 _decimals)
        ERC20Detailed(_name, _symbol, _decimals)
        public
    {

    }
}

// Deploy
// truffle(development)> DappToken.deployed().then((t) => { token = t })

// Address
// truffle(development)> token.address

// Name and symbol
// token.name()
// token.symbol()