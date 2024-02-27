pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Scratchable is Ownable{
    bool scratched = false;
    uint percentageWinning;
    uint oddsToWin;

    struct prize {
        address mainScratcherContract;
        address currency;
        uint value;
    }

    function scratch() public returns(uint){

    }
}