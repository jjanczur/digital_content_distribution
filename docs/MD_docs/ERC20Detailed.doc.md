# ERC20Detailed
Optional functions from the ERC20 standard.

## constructor - read
|name |type |description
|-----|-----|-----------
|name|string|
|symbol|string|
|decimals|uint8|
Sets the values for `name`, `symbol`, and `decimals`. All three of these values are immutable: they can only be set once during construction.
function Object() { [native code] }

## Approval - read
|name |type |description
|-----|-----|-----------
|owner|address|
|spender|address|
|value|uint256|
**Add Documentation for the method here**

## Transfer - read
|name |type |description
|-----|-----|-----------
|from|address|
|to|address|
|value|uint256|
**Add Documentation for the method here**

## allowance - view
|name |type |description
|-----|-----|-----------
|owner|address|
|spender|address|
Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default.     * This value changes when {approve} or {transferFrom} are called.

## approve - read
|name |type |description
|-----|-----|-----------
|spender|address|
|amount|uint256|
Sets `amount` as the allowance of `spender` over the caller's tokens.     * Returns a boolean value indicating whether the operation succeeded.     * IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729     * Emits an {Approval} event.

## balanceOf - view
|name |type |description
|-----|-----|-----------
|account|address|
Returns the amount of tokens owned by `account`.

## decimals - view
_No parameters_
Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`).     * Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.     * NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.

## name - view
_No parameters_
Returns the name of the token.

## symbol - view
_No parameters_
Returns the symbol of the token, usually a shorter version of the name.

## totalSupply - view
_No parameters_
Returns the amount of tokens in existence.

## transfer - read
|name |type |description
|-----|-----|-----------
|recipient|address|
|amount|uint256|
Moves `amount` tokens from the caller's account to `recipient`.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event.

## transferFrom - read
|name |type |description
|-----|-----|-----------
|sender|address|
|recipient|address|
|amount|uint256|
Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.     * Returns a boolean value indicating whether the operation succeeded.     * Emits a {Transfer} event.