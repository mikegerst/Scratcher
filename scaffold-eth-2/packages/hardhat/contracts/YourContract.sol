//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 */
contract YourContract {

	uint8 public nonlinearity;
    uint256 public inf;

	constructor() {
		nonlinearity = 25;
		inf = (2**256)-1;
	}

	function getRewards(uint256 vrf_num) private view returns (uint8) {
		uint8 new_vrf_num = uint8(vrf_num);
		uint8 reward = uint8((new_vrf_num*(uint8(100)/uint8(255)))**nonlinearity);
		return reward;
	}

	function getRewards_256(uint256 vrf_num) private view returns (uint8) {
		uint8 reward = uint8((vrf_num/inf)**nonlinearity);
		return reward;
	}

}
