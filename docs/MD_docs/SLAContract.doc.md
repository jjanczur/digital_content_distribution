# SLAContract


## constructor - read
|name |type |description
|-----|-----|-----------
|_merchant|address|
|_creator|address|
|_dcHash|string|
|_creatorCompensation|uint256|
|_currentPrice|uint256|
|_token|address|
function Object() { [native code] }

## buy - read
_No parameters_
Buy the digital content. The content token will be automatically issued to the buyer's account

## creator - view
_No parameters_
**Add Documentation for the method here**

## creatorCompensation - view
_No parameters_
**Add Documentation for the method here**

## currentPrice - view
_No parameters_
**Add Documentation for the method here**

## dcHash - view
_No parameters_
**Add Documentation for the method here**

## deliverer - view
_No parameters_
**Add Documentation for the method here**

## delivererCompensation - view
_No parameters_
**Add Documentation for the method here**

## keyAuthority - view
_No parameters_
**Add Documentation for the method here**

## keyAuthorityCompensation - view
_No parameters_
**Add Documentation for the method here**

## merchant - view
_No parameters_
**Add Documentation for the method here**

## setCurrentPrice - read
|name |type |description
|-----|-----|-----------
|newPrice|uint256|New price of the content
Set a current price of digital content. Can be triggered only by the merchant. Price cannot be lower than creatorCompensation

## setDeliverer - read
|name |type |description
|-----|-----|-----------
|_deliverer|address|address of Deliverer picked by the merchant
Set a deliverer. Can be triggered only by the merchant

## setDelivererCompensation - read
|name |type |description
|-----|-----|-----------
|_delivererCompensation|uint256|Compensation for the deliverer
Set a deliverer's compensation. Can be triggered only by the merchant

## setKACompensation - read
|name |type |description
|-----|-----|-----------
|_keyAuthorityCompensation|uint256|Compensation
Set a deliverer's compensation. Can be triggered only by the merchant

## setKeyAuthority - read
|name |type |description
|-----|-----|-----------
|_keyAuthority|address|address of Key Authority picked by the merchant
Set a Key Authority. Can be triggered only by the merchant

## token - view
_No parameters_
**Add Documentation for the method here**