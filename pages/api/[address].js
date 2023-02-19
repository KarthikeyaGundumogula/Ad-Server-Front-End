// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import axios from "axios";
const SUBGRAPH = process.env.SubGraph_URL;
const ServerAddress = process.env.Server_ADDRESS;
const Server_ABI = process.env.Server_ABI;
export default async function handler(req, res) {
  let AdId;
  let AdLink;
  let Advertiser;
  let address = req.query.address;
  console.log(address);
  let query = `{
  publishers(
    where: {Publisher: "${address}"}
  ) {
    Advertisers
  }
}`;
  try {
    const response = await axios.post(SUBGRAPH, { query });
    const publishers = response.data?.data?.publishers;
    if (!publishers || publishers.length === 0) {
      throw new Error("No publishers found for this address");
    }
    const length = publishers[0].Advertisers.length;
    let x = Math.floor(Math.random() * length);
    AdId = x + 1;
  } catch (error) {
    console.log("Error retrieving publishers", error);
  }
  query = `{ads(first: 5 where:{AdId:"${AdId}"}) {
    AdData
    Advertiser
  }}`;
  try {
    const response = await axios.post(SUBGRAPH, { query });
    const ads = response.data?.data?.ads;
    if (!ads || ads.length === 0) {
      throw new Error("No ads found for this address");
    }
    AdLink = ads[0].AdData;
    Advertiser = ads[0].Advertiser;
    console.log(AdLink, Advertiser);
  } catch (error) {
    console.log("Error retrieving ads", error);
  }
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/oF0VkR1DtxMYpSbUf4RyDwLyclveHuCw",
    {
      chainId: 80001,
    }
  );
  const signer = new ethers.Wallet(
    "b44242c0805f9bcb4cea019517d45ec806fb4850a15e3b28cdfc6ac261e1cbc5",
    provider
  );
  const contract = new ethers.Contract(ServerAddress, Server_ABI, signer);
  const tx = await contract.serveAd(AdId, address, Advertiser);
  tx.wait().then((receipt) => {
    console.log("done");
  });
  let html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
  <img src="${AdLink}" alt="Ad" />
  </body>
</html>
`;

  res.send(html);
}
