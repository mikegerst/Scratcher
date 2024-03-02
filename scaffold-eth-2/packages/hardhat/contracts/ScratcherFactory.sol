// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity >=0.8.0 <0.9.0;

import "./Scratcher.sol";


contract ScratcherFactory {
    uint nextScratcherId = 0;

    struct ScratcherInfo {
        uint id;
        address scratcherAddress;
        string name;
    }
    mapping(uint => ScratcherInfo) scratcherAddresses;
    event ScratcherCreated(uint id, string _name, address _address);
    
    function createScratcher(uint64 chainlinkVRFSubscriptionId, 
                string memory name, 
                string memory symbol,
                uint price,
                uint totalForSale,
                uint64 maxPurchase)public returns(address){
                    
                    Scratcher scratcher = new Scratcher(chainlinkVRFSubscriptionId, name, symbol, price, totalForSale, maxPurchase, msg.sender);
                    address scratcherAddress = address(scratcher);
                    scratcherAddresses[nextScratcherId] = ScratcherInfo(nextScratcherId, scratcherAddress, name); 
                    emit ScratcherCreated(nextScratcherId, name, scratcherAddress);
                    nextScratcherId++;
                    
                    return scratcherAddress;
                }

}
