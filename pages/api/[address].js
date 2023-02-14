// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import axios from "axios";
export default async function handler(req, res) {
  const SUBGRAPH = process.env.SubGraph_URL;
  console.log(req.query.address);
  let address = req.query.address;
  let query = `{
  publishers(
    first: 5
    where: {Publisher: "0x09446c630E1F285F14476aea9E78Ce08A2De565D"}
  ) {
    Advertisers
  }
}`;
  let resus = await axios.post(SUBGRAPH, { query });
  let AdId = await resus.data.data.publishers[0].Advertisers;
  query = `{
  ads(
    first: 5
    where: {id:"1"}
    ) {
    AdImg
  }
}`;
  let resus2 = await axios.post(SUBGRAPH, { query });
  let AdImg = await resus2.data.data.ads[0].AdImg;
  console.log(SUBGRAPH);
  res.send(`${AdImg}`);
}
