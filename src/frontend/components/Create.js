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
  const pinataApiKey = '02724595cdea842971f1';
  const pinataSecretApiKey = '82cfaeeab5bac494da2a034ec5e28f3292ce10dd62faff011a55c70201c042b1';
  const JWTtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4M2VkODc5OC01NDM1LTQzMWYtOWQ1MS1mYTkxZDBmOWI5MWIiLCJlbWFpbCI6ImxlaGFpdGllbjQyMjAwM2RldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDI3MjQ1OTVjZGVhODQyOTcxZjEiLCJzY29wZWRLZXlTZWNyZXQiOiI4MmNmYWVlYWI1YmFjNDk0ZGEyYTAzNGVjNWUyOGYzMjkyY2UxMGRkNjJmYWZmMDExYTU1YzcwMjAxYzA0MmIxIiwiaWF0IjoxNzAyMjgyODkzfQ.vitS-78vgAfST-RIR4iGE_zv2YLNnwI4Xb1THAw8i3o';
  const gateway = 'fuchsia-tropical-viper-783.mypinata.cloud/ipfs/'
  const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    return axios
        .get(url, {
            headers: {
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        })
        .then(function (response) {
          alert("success to connect")
        })
        .catch(function (error) {
          alert("Fail to connect")
        })
      }

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
          // Using axios to pin file to Pinata
          const formData = new FormData();
          formData.append('file', file);

        
          const response = await axios.post(pinataFileEndpoint, formData, {
            headers: {
              'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey,
              'Authorization' :  `Bearer ${JWTtoken}`
            },
          });
          const urlFile = gateway+response.data.IpfsHash;
          setImage(urlFile);//the link to view the file
          console.log("The file of NFT :"+ urlFile);


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
     


      //post on pinata
      const response = await axios.post(pinataJSONEndpoint, metadata, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
          'Authorization' :  `Bearer ${JWTtoken}`
        },
      });


      const ipfsHashInfoItem = response.data.IpfsHash; //hash the data was posted
      const urlNFT = gateway+ipfsHashInfoItem;
      console.log("The url of item NFT "+urlNFT)

      mintThenList(urlNFT) //create new nft


    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }

  const mintThenList = async (result) => {
    const uri = result
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
              <Button onClick={testAuthentication}>Test IFPS </Button>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create