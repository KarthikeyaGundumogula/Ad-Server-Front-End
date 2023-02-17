// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import axios from "axios";
export default async function handler(req, res) {
  const SUBGRAPH = process.env.SubGraph_URL;
  const ContractAddress = process.env.NEXT_PUBLIC_Server_ADDRESS;
  const ABI = process.env.NEXT_PUBLIC_Server_ABI;

  let address = req.query.address;
  let query = `{
  publishers(
    first: 5
    where: {Publisher: "${address}"}
  ) {
    Advertisers
  }
}`;
  let resus = await axios.post(SUBGRAPH, { query });
  let AdId = await resus.data.data.publishers[0].Advertisers;
  let index = Math.floor(Math.random() * AdId.length);
  console.log(AdId[index]);
  query = `{
  ads(
    first: 5
    where: {id:"${AdId[0]}"}
    ) {
    AdData
  }
}`;
  let resus2 = await axios.post(SUBGRAPH, { query });
  const x = resus2.data.data.ads[0].AdData;
  const y = await axios.get(x);
  const targetUrl = y.data.targetURL || "https://www.google.com";
  const handleClick = async () => {
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
      const contract = await new ethers.Contract(ContractAddress, ABI, signer);
      const tx = await contract.functions.transferClickReward(
        AdId[index],
        address
      );
      const signedTx = await signer.signTransaction(tx);
      const sentTx = await provider.sendTransaction(signedTx);
      await sentTx.wait();
      console.log("Clicked");
    } catch (err) {
      console.error(err);
    }
  };
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <h1>Ad</h1>
      <a href="${targetUrl}">
      <img src="${
        y.data.ImgLink
      }" alt="Ad Image" border="1" onClick="${handleClick()}"></img></a>
      <img src="xyz/abc/${address}/${
    AdID[index]
  }" height="1" width="1" style={display:none} />
    </body>
  </html>`;
  res.send(html);
}
