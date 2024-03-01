// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

/*Arbitrum
VRF Coordinator	
0x50d47e4142598E3411aA864e08a44284e471AC6f
Copy to clipboard
50 gwei Key Hash	
0x027f94ff1465b3525f9fc03e9ff7d6d2c0953482246dd6ae07570c45d6631414
Copy to clipboard

Fuji 
VRF Coordinator	
0x2eD832Ba664535e5886b75D64C46EB9a228C2610
Copy to clipboard
300 gwei Key Hash	
0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61
Copy to clipboard

Polygon Mumbai
LINK Token	
0x326C977E6efc84E512bB9C30f76E30c160eD06FB
Copy to clipboard
Switch network and add to wallet
VRF Coordinator	
0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
Copy to clipboard
500 gwei Key Hash	
0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f
Copy to clipboard
Premium	0.0005 LINK
Max Gas Limit	2,500,000
Minimum Confirmations	3
Maximum Confirmations	200
Maximum Random Values	500
*/



import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract Scratcher is ERC721, ERC721Burnable, VRFConsumerBaseV2,  Ownable {
    //NFT Variables
    
    uint prizePool = 0;
    uint nextId = 0;
    uint liveScratchers = 0;
    
    uint price;
    uint64 maxPurchasePerAddress;
    uint totalForSale;
    uint totalSold = 0;

    //Reward Formula Variables
    uint8  constant public nonlinearity = 24;
    uint256  constant public inf = (2**256)-1;


    mapping(address => uint) numberPurchased;
    mapping(uint => bool) nftScratched;
    //NFT Variables end 
    //mapping of nft id to requestId
    mapping(uint => uint) nftToVRFRequestId;
    mapping(uint => uint) nftToReward;
    //VRF Variables
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; 
        bool exists; 
        uint256 result;
    }
    mapping(uint256 => RequestStatus)
        public s_requests;
    VRFCoordinatorV2Interface COORDINATOR;

    
    uint64 public s_subscriptionId;

    
    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash =
             0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

    uint32 callbackGasLimit = 25000000;

    uint16 requestConfirmations = 3;

    uint32 numWords = 1;

    uint256 public currentResult;

    //VRF Variables end
    constructor(uint64 chainlinkVRFSubscriptionId ,string memory name, string memory symbol, uint _price, uint _totalForSale, uint64 _maxPurchase, address initialOwner) ERC721(name, symbol) VRFConsumerBaseV2(0x2eD832Ba664535e5886b75D64C46EB9a228C2610)
         Ownable(initialOwner) payable {
            COORDINATOR = VRFCoordinatorV2Interface(
            0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
        );
        prizePool += msg.value;
        s_subscriptionId = chainlinkVRFSubscriptionId;
        price = _price;
        totalForSale = _totalForSale;
        maxPurchasePerAddress = _maxPurchase;
    }

    function safeMint(address to, uint256 tokenId) internal {
        _safeMint(to, tokenId);
    }
    function buyScratcher() payable public {
        require(msg.value >= price, "Not enough funds sent");
        require(totalSold < totalForSale, "Sold Out!!!");
        require(numberPurchased[msg.sender] < maxPurchasePerAddress, "Reached purchase limit");
        safeMint(msg.sender, nextId);
        nftScratched[nextId] = false;
        nextId++;
        liveScratchers++;
        numberPurchased[msg.sender]++;
        prizePool += msg.value;
        totalSold++;
    }

    function scratch(uint id) external {
        require(!nftScratched[id], "Already scratched this one");
        require(ownerOf(id) == msg.sender,"Not the owner of scratcher");
        nftToVRFRequestId[id] = requestRandomWords();
        nftScratched[id] = true;
        
        _burn(id);
        liveScratchers--;

        
    }

    function isScratched(uint id) public view returns(bool) {
        return nftScratched[id];
    }


    function requestRandomWords()
        internal
        returns (uint256 requestId)
    {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            result: 0,
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].result = (_randomWords[0] % 100) + 1;
        
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getNftScratchResult(uint id)public view  returns(uint _id, uint _result) {
        uint requestId = nftToVRFRequestId[id];
        return (requestId, s_requests[requestId].result);
    }

	function getRewards(uint256 vrf_num) private pure returns (uint) {
		uint reward = (vrf_num**nonlinearity)/(100**nonlinearity);
		return reward;
	}

    function getPrizePoolBalance() public view returns(uint){
        return prizePool;
    }

    function fundPrizePool() public payable onlyOwner{
        prizePool += msg.value;
    }
}