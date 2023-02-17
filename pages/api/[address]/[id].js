import { ethers } from "ethers";
import axios from "axios";

export default async function handler(req, res) {
  const SUBGRAPH = process.env.SubGraph_URL;
  const ContractAddress = process.env.NEXT_PUBLIC_Server_ADDRESS;
  const ABI = process.env.NEXT_PUBLIC_Server_ABI;
  console.log(req.query);
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/oF0VkR1DtxMYpSbUf4RyDwLyclveHuCw",
      {
        chainId: 80001,
      }
    );
    const signer = await new ethers.Wallet(
      "b44242c0805f9bcb4cea019517d45ec806fb4850a15e3b28cdfc6ac261e1cbc5",
      provider
    );
    const query = `{
  ads(
    first: 5
    where: {id:"${req.query.id}"}
    ) {
    Advertiser
  }
}`;
    let resus = await axios.post(SUBGRAPH, { query: query });
    const Advertiser = resus.data.data.ads[0].Advertiser;
    const contract = await new ethers.Contract(ContractAddress, ABI, signer);
    const tx = await contract.functions.serveAd(
      req.query.id,
      req.query.address,
      Advertiser
    );
    const signedTx = await signer.signTransaction(tx);
    const sentTx = await provider.sendTransaction(signedTx);
    await sentTx.wait();
    console.log("viewed");
    console.log(Advertiser);
  } catch (err) {
    console.error(err);
  }
  res.send();
}
