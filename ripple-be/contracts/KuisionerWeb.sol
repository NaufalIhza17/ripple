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

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 prize);

    constructor (){
        owner = msg.sender;
    }

    function list(uint256 _id, string memory _name, string memory _category, uint256 _prize) public{

        require(msg.sender == owner);
        Item memory item = Item(_id, _name, _category, _prize);

        items[_id] = item;

        emit List(_name, _prize);
    }

    function win(uint256 _id) public payable{
Item memory item = items[_id];

        Order memory order = Order(block.timestamp, item);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

    }
}