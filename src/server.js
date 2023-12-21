//get nft and market on testnet
require("dotenv").config();
const {MORALIS_API_KEY } = process.env;
const express = require("express");
const Moralis = require("moralis").default

const app= express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());
/////HOW TO USE THIS SERVER
//this server will run first at port 3000 and listen at port 3001
//run cmd to save this file server.js: node src/server.js  

Moralis.start({
    apiKey: MORALIS_API_KEY,
}).then(()=>{
    app.listen(port,()=>{
        console.log("Listen call successfully on moralis at port: "+port);
    })
})


app.get("/get_owners",async (req,res)=>{
    const nftAddress = req.query.address;
    try {
        const response = await Moralis.EvmApi.nft.getNFTOwners({
            chain: "0xaa36a7",
            format: "decimal",
            normalizeMetadata:true,
            address: nftAddress
          });
        console.log(response);
        res.json(response.raw);
    } catch (error) {
        console.error(error);
        res.status(500).send("Can not to find NFT owners.");
    }
})

