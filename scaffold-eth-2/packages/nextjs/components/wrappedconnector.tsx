
import React from 'react';

//Particle Imports
import { WalletEntryPosition } from "@particle-network/auth";
import { ArbitrumGoerli } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { ConnectButton } from "@particle-network/connect-react-ui"; 
import "@particle-network/connect-react-ui/dist/index.css";


const WrappedModal = () => { return(
<div>
<ModalProvider 
options={{
  projectId: String("befdedc2-4155-4709-a4e0-370f42e665f2"),
  clientKey: String("clsCaYGWDSyfHirivVmlbcZcvKOqHbK8b4Yyb6bi"),
  appId: String("e2e7f3aa-2c69-41af-9a6c-cf8c4c3d677c"),
  chains: [ArbitrumGoerli],
  particleWalletEntry: {
    //optional: particle wallet config
    displayWalletEntry: true, //display wallet button when connect particle success.
    defaultWalletEntryPosition: WalletEntryPosition.TR,
    supportChains: [ArbitrumGoerli],
    customStyle: {}, //optional: custom wallet style
  },
  securityAccount: {
    //optional: particle security account config
    //prompt set payment password. 0: None, 1: Once(default), 2: Always
    promptSettingWhenSign: 1,
    //prompt set master password. 0: None(default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1,
  },
  wallets: evmWallets({
    projectId: "walletconnect projectId", //replace with walletconnect projectId
    showQrModal: false,
  }),
}}
theme={"dark"}
language={"en"} //optional:localize, default en
walletSort={["Particle Auth", "Wallet"]} //optional:walelt order
particleAuthSort={[
  //optional:display particle auth items and order
  "email",
  "phone",
  "google",
  "apple",
  "facebook",
]}
><ConnectButton></ConnectButton></ModalProvider>
</div>
)};
export default WrappedModal