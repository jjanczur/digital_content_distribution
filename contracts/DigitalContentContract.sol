pragma solidity 0.5.12;

// import "./DappToken.sol";
import "./DappToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Address.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract DigitalContentContract {
  using Address for address;
  using Address for address payable;
  using SafeMath for uint256;

  address public merchant;
  address public deliverer;
  address public keyAuthority;
  address public creator;
  string public dcHash;
  uint256 public delivererCompensation;
  uint256 public keyAuthorityCompensation;
  uint256 public creatorCompensation;
  uint256 public currentPrice;
  DappToken public token;


  modifier onlyMerchant {
    require (msg.sender == merchant, "Only merchant can call ths function");
    _;
  }

  constructor(
    address _merchant,
    address _creator,
    string memory _dcHash,
    uint256 _creatorCompensation,
    uint256 _currentPrice,
    DappToken _token
  )
  public {
    merchant = _merchant;
    creator = _creator;
    dcHash = _dcHash;
    creatorCompensation = _creatorCompensation;
    currentPrice = _currentPrice;
    token = _token;
  }

  /**
  * @dev Set a deliverer. Can be triggered only by the merchant
  * @param _deliverer address of Deliverer picked by the merchant
  */
  function setDeliverer(address _deliverer)
    public onlyMerchant
  {
    deliverer = _deliverer;
  }

    /**
  * @dev Set a deliverer's compensation. Can be triggered only by the merchant
  * @param _delivererCompensation Compensation for the deliverer
  */
  function setDelivererCompensation(uint256 _delivererCompensation)
    public onlyMerchant
  {
    delivererCompensation = _delivererCompensation;
  }

    /**
  * @dev Set a Key Athority. Can be triggered only by the merchant
  * @param _keyAuthority address of Key Athority picked by the merchant
  */
  function setKeyAthority(address _keyAuthority)
    public onlyMerchant
  {
    keyAuthority = _keyAuthority;
  }

  /**
  * @dev Set a deliverer's compensation. Can be triggered only by the merchant
  * @param _keyAuthorityCompensation Compensation
  */
  function setKACompensation(uint256 _keyAuthorityCompensation)
    public onlyMerchant
  {
    keyAuthorityCompensation = _keyAuthorityCompensation;
  }

  /**
  * @dev Set a current price of digital content. Can be triggered only by the merchant. Price cannot be lower than creatorCompensation
  * @param _newPrice New price of the content
  */
  function setCurrentPrice(uint256 _newPrice)
    public onlyMerchant
  {
    require ( _newPrice >= creatorCompensation
    .add(delivererCompensation)
    .add(keyAuthorityCompensation),
       "new price cannot be lower than the sum of the involved parties compensation");

    currentPrice = _newPrice;
  }

    /**
  * @dev Issue a token and send it to a buyer's address
  * @param buyer Digital content purchaser
  */
  function issueToken(
    address buyer
  )
    internal
  {
    token.mint(buyer, 1);
  }

  /**
  * @dev Buy the digital content. The content token will be authomatically issued to the buyer's account
  */
  function buy()
    public payable
  {
    // Balance needs to be higher or equal than combined balance of Deliverer, Key Authority and Creator
    require(address(this).balance >= creatorCompensation
    .add(delivererCompensation)
    .add(keyAuthorityCompensation), "Address: insufficient balance");

    // Compensate transaction participants
    creator.toPayable().sendValue(creatorCompensation);
    deliverer.toPayable().sendValue(delivererCompensation);
    keyAuthority.toPayable().sendValue(keyAuthorityCompensation);

    uint256 merchantCompensation = currentPrice
      .sub(creatorCompensation)
      .sub(delivererCompensation)
      .sub(keyAuthorityCompensation);

    // Merchant can resign from their compensation - compensation = 0
    if(merchantCompensation > 0) {
      merchant.toPayable().sendValue(merchantCompensation);
    }

    // Issue the token for the buyer
    issueToken(msg.sender);
  }

}