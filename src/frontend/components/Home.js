import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
const Home = ({ marketplace, nft}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const url = require('url')

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    console.log("Number of tokens: " +itemCount)

    let items = [] // the array we will fetch metadata from pinata

    for (let i = 1; i <= itemCount; i++) {

      const item = await marketplace.items(i)//info of NFT include 
      
      console.log("The item of marketplace: "+item)

      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)//link of nft info
        console.log("Information of NFT: "+uri)

        // use uri to fetch the nft metadata stored on ipfs 
       const response = await fetch('https://'+ uri)//get values of the uri 
        const metadata = await response.json() //IPFS storage
        console.log(metadata)

        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          //ipfs storage info
          name: metadata.name,
          description: metadata.description,
          image: 'https://'+ metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  async function fetchJsonFromPinata(pinataUrl) {
    try {
        const response = await axios.get(pinataUrl);
        const jsonData = response.data;
        console.log('Fetched JSON Data:', jsonData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

  //mua bất động sản
  const buyMarketItem = async (item) => {
    setLoading(true)
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()//load lại all sản phẩm
    toast.success('Giao dịch thông công !', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setLoading(false)
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, []);


  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
    <ToastContainer />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <h2>   Đang xử lý dữ liệu...</h2> 
    </div>
    </main>
  )
  return (
    <div className="flex justify-center">
    <ToastContainer />
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden" >
                <Card className='card-nft'>
                  <Card.Img variant="top"  src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Thông tin: {item.description}
                    </Card.Text>
                   <Card.Text>Nguồn gốc: {item.seller}</Card.Text>
                  </Card.Body>
              
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="dark" size="lg" className='btn-buy'>
                        Mua bằng {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>Chưa có tài sản nào !</h2>
          </main>
        )}
    </div>
  );
}
export default Home