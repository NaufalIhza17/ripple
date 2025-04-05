// SPDX-Liecense-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract KuisionerWeb {
    address public owner; 

    struct Item{
        uint256 id;
        string name;
        string category;
        uint256 prize;
    }

    mapping(uint256 => Item) public items;

    event List(string name, uint256 prize);

    constructor (){
        owner = msg.sender;
    }

    function list(uint256 _id, string memory _name, string memory _category, uint256 _prize) public{

        Item memory item = Item(_id, _name, _category, _prize);

        items[_id] = item;

        emit List(_name, _prize);
    }

}