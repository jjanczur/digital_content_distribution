# Ownable
Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. * This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.

## constructor - read
_No parameters_
Initializes the contract setting the deployer as the initial owner.
function Object() { [native code] }

## OwnershipTransferred - read
|name |type |description
|-----|-----|-----------
|previousOwner|address|
|newOwner|address|
**Add Documentation for the method here**

## isOwner - view
_No parameters_
Returns true if the caller is the current owner.

## owner - view
_No parameters_
Returns the address of the current owner.

## renounceOwnership - read
_No parameters_
Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner.     * NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

## transferOwnership - read
|name |type |description
|-----|-----|-----------
|newOwner|address|
Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.