// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
const fs = require("fs");
import { Web3Storage } from "web3.storage";
import axios from "axios";
export default async function handler(req, res) {
  const SUBGRAPH = process.env.SubGraph_URL;
  console.log(req.query.address);
  const apiToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIyOTMzRDhDM2Y5MzkyRjI2MDNjZDZiQUFBZTczRjJhNjNCRjcxYjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3OTk3MjYxOTEsIm5hbWUiOiJBZCBzZXJ2ZXIifQ.bGUQJrYJIA4ugMI_gPUQxHMLPTFuCs0xgkgFK-kBaXw";
  let client = new Web3Storage({ token: apiToken });
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
  console.log(AdId);
  query = `{
  ads(
    first: 5
    where: {id:"${AdId[0]}"}
    ) {
    AdData
  }
}`;
  let resus2 = await axios.post(SUBGRAPH, { query });
  console.log(resus2.data.data.ads);
  res.send(resus2.data.data.ads[0].AdData);
}
