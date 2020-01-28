# ContentContractFactory

## constructor - read

| name       | type   | description |
| ---------- | ------ | ----------- |
| \_name     | string |
| \_symbol   | string |
| \_decimals | uint8  |

function Object() { [native code] }

## OwnershipTransferred - read

| name          | type    | description |
| ------------- | ------- | ----------- |
| previousOwner | address |
| newOwner      | address |

**Add Documentation for the method here**

## deployContentContract - read

| name                | type    | description                 |
| ------------------- | ------- | --------------------------- |
| merchant            | address | Address of a Merchant       |
| dcHash              | string  | Hash of the digital content |
| creatorCompensation | uint256 | Compensation of the creator |
| currentPrice        | uint256 | Address of a merchant       |

Allows owner to create digital content contract for the merchant

## deployedContracts - view

| name | type    | description |
| ---- | ------- | ----------- |
|      | uint256 |

**Add Documentation for the method here**

## getContractsByAddress - view

_No parameters_
**Add Documentation for the method here**

## isOwner - view

_No parameters_
Returns true if the caller is the current owner.

## owner - view

_No parameters_
Returns the address of the current owner.

## renounceOwnership - read

_No parameters_
Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. \* NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

## tokenAddress - view

_No parameters_
**Add Documentation for the method here**

## transferOwnership - read

| name     | type    | description |
| -------- | ------- | ----------- |
| newOwner | address |

Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
