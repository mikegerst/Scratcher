pragma solidity ^0.8.17;

import "./Scratcher.sol";

contract ScratcherFactory {
    uint nextScratcherId = 0;

    struct ScratcherInfo {
        uint id;
        address scratcherAddress;
        string name;
    }
    mapping(uint => ScratcherInfo) scratcherAddresses;
    event ScartcherCreated(uint id, string _name, address _address);
    
    function createScratcher(uint64 chainlinkVRFSubscriptionId, 
                string memory name, 
                string memory symbol,
                uint price,
                uint totalForSale,
                uint64 maxPurchase)public returns(address){
                    
                    Scratcher scratcher = new Scratcher(chainlinkVRFSubscriptionId, name, symbol, price, totalForSale, maxPurchase, msg.sender);
                    address scratcherAddress = address(scratcher);
                    scratcherAddresses[nextScratcherId] = ScratcherInfo(nextScratcherId, scratcherAddress, name); 
                    emit ScartcherCreated(nextScratcherId, name, scratcherAddress);
                    nextScratcherId++;
                    return scratcherAddress;
                }

}