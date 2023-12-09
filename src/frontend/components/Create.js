import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
//import pinataSDK from '@pinata/sdk';
const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const pinataJSONEndpoint = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const pinataFileEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';  
 
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
          // Using axios to pin file to Pinata
          const formData = new FormData();
          formData.append('file', file);
          const pinataApiKey = '552ae2104ec19063bd47';
          const pinataSecretApiKey = '7a07bf165aabd3d63d20713615cc424c7136d3352287a61b931351fee69cf0a5';
          const JWTtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4M2VkODc5OC01NDM1LTQzMWYtOWQ1MS1mYTkxZDBmOWI5MWIiLCJlbWFpbCI6ImxlaGFpdGllbjQyMjAwM2RldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTUyYWUyMTA0ZWMxOTA2M2JkNDciLCJzY29wZWRLZXlTZWNyZXQiOiI3YTA3YmYxNjVhYWJkM2Q2M2QyMDcxMzYxNWNjNDI0YzcxMzZkMzM1MjI4N2E2MWI5MzEzNTFmZWU2OWNmMGE1IiwiaWF0IjoxNzAxODU5NjA2fQ.X5eWwsouQ-QJfHYLwk7KGdAUzdQGDtrQ2_g___Iakmc';
        
          const response = await axios.post(pinataFileEndpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey,
              'Authorization' :  `Bearer ${JWTtoken}`
            },
          });
  
          console.log(response.data);
          setImage(`https://blush-cheerful-sparrow-995.mypinata.cloud/ipfs/${response.data.IpfsHash}`);
        
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }


  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      //save info of items
      const metadata = JSON.stringify({image,price,name,description})
      console.log("data before post JSON IPFS: "+metadata)
      //post on pinata
      const pinataApiKey = '552ae2104ec19063bd47';
      const pinataSecretApiKey = '7a07bf165aabd3d63d20713615cc424c7136d3352287a61b931351fee69cf0a5';
      const JWTtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4M2VkODc5OC01NDM1LTQzMWYtOWQ1MS1mYTkxZDBmOWI5MWIiLCJlbWFpbCI6ImxlaGFpdGllbjQyMjAwM2RldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTUyYWUyMTA0ZWMxOTA2M2JkNDciLCJzY29wZWRLZXlTZWNyZXQiOiI3YTA3YmYxNjVhYWJkM2Q2M2QyMDcxMzYxNWNjNDI0YzcxMzZkMzM1MjI4N2E2MWI5MzEzNTFmZWU2OWNmMGE1IiwiaWF0IjoxNzAxODU5NjA2fQ.X5eWwsouQ-QJfHYLwk7KGdAUzdQGDtrQ2_g___Iakmc';
    
      const response = await axios.post(pinataJSONEndpoint, metadata, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
          'Authorization' :  `Bearer ${JWTtoken}`
        },
      });

      const ipfsHashInfoItem = response.data.IpfsHash;

      mintThenList(ipfsHashInfoItem) //create new nft


    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }

  const mintThenList = async (result) => {
    const uri = `https://blush-cheerful-sparrow-995.mypinata.cloud/ipfs/${result.IpfsHash}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Tên sản phẩm" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Chi tiết sản phẩm" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Giá bằng ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Tạo mới và thêm vào danh sách tài sản
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create