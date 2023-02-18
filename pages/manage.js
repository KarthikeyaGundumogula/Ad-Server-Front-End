import Dashboard from "../components/Dashboard/Index";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function Manage() {
  const { address } = useAccount();
  const [EthAccount, setEthAccount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (address) {
      setEthAccount(address);
      setIsConnected(true);
    }
  }, [address]);
  return <> {isConnected ? <Dashboard /> : <h2>Connect Your Wallet..</h2>} </>;
}
