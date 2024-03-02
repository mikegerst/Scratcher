import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy YourContract
  await deploy("YourContract", {
    from: deployer,
    args: [], // Add constructor arguments here if necessary
    log: true,
    autoMine: true,
  });

  // Deploy ScratcherFactory
  await deploy("ScratcherFactory", {
    from: deployer,
    args: [], // Add constructor arguments here if necessary
    log: true,
    autoMine: true,
  });

  // Additional deployment logic can be added here
};

export default deployYourContract;

deployYourContract.tags = ["YourContract", "ScratcherFactory"];