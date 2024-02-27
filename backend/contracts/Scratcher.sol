// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Scratcher is ERC1155, Ownable {

    uint prizePool = 0;
    uint nextId = 1;
    uint liveScratchers = 0;

    uint price = 100000;
    struct prize {
        address mainScratcherContract;
        address currency;
        uint value;
    }

    mapping(uint => bool) nftScratched;
    
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    function buyScratcher() payable public {
        require(msg.value >= price, "Not enough funds sent");
        mint(msg.sender, nextId, 1, "");
        nftScratched[nextId] = false;
        nextId++;
        liveScratchers++;
        prizePool += msg.value;
    }

    function scratch(uint id) external {
        require(!nftScratched[id], "Already scratched this one");
        require(balanceOf(msg.sender, id) == 1, "Not the owner of scratcher");
        
        nftScratched[id] = true;
        liveScratchers--;
    }

    function isScratched(uint id) public view returns(bool) {
        return nftScratched[id];
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        internal
    {
        _mint(account, id, amount, data);
        
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
