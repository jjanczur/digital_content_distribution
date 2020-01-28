# ERC20
Implementation of the {IERC20} interface. * This implementation is agnostic to the way tokens are created. This means that a supply mechanism has to be added in a derived contract using {_mint}. For a generic mechanism see {ERC20Mintable}. * TIP: For a detailed writeup see our guide https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How to implement supply mechanisms]. * We have followed general OpenZeppelin guidelines: functions revert instead of returning `false` on failure. This behavior is nonetheless conventional and does not conflict with the expectations of ERC20 applications. * Additionally, an {Approval} event is emitted on calls to {transferFrom}. This allows applications to reconstruct the allowance for all accounts just by listening to said events. Other implementations of the EIP may not emit these events, as it isn't required by the specification. * Finally, the non-standard {decreaseAllowance} and {increaseAllowance} functions have been added to mitigate the well-known issues around setting allowances. See {IERC20-approve}.

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
See {IERC20-allowance}.

## approve - read
|name |type |description
|-----|-----|-----------
|spender|address|
|amount|uint256|
See {IERC20-approve}.     * Requirements:     * - `spender` cannot be the zero address.

## balanceOf - view
|name |type |description
|-----|-----|-----------
|account|address|
See {IERC20-balanceOf}.

## decreaseAllowance - read
|name |type |description
|-----|-----|-----------
|spender|address|
|subtractedValue|uint256|
Atomically decreases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.

## increaseAllowance - read
|name |type |description
|-----|-----|-----------
|spender|address|
|addedValue|uint256|
Atomically increases the allowance granted to `spender` by the caller.     * This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.     * Emits an {Approval} event indicating the updated allowance.     * Requirements:     * - `spender` cannot be the zero address.

## totalSupply - view
_No parameters_
See {IERC20-totalSupply}.

## transfer - read
|name |type |description
|-----|-----|-----------
|recipient|address|
|amount|uint256|
See {IERC20-transfer}.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.

## transferFrom - read
|name |type |description
|-----|-----|-----------
|sender|address|
|recipient|address|
|amount|uint256|
See {IERC20-transferFrom}.     * Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20};     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `amount`. - the caller must have allowance for `sender`'s tokens of at least `amount`.