// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.20;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;

}

contract Transaction{
    address public user;
    address payable public responden;
    address public nftAddress;

    constructor(address _nftAddress, address payable _responden, address user){
        nftAddress = _nftAddress;
        responden = _responden;
        user = user;
    }
}