import React from 'react';

export default function Footer() {
  return (
    <div className='mt-5'>

    <footer class="text-white text-center text-lg-start bg-dark">
    <div class="container p-4">
      <div class="row mt-4">
        <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Giới thiệu dự án</h5>
  
          <p>
            Dự án được phát triển nhằm mô phỏng hoạt động tạo mới và trao đổi NFT, mỗi NFT đại diện cho từng bất động sản và thông tin kèm theo.
            Công nghệ lưu trữ IPFS được sử dụng là Pinata cloud và mạng lưới blockchain Sepolia của ETH.
          </p>
  
          <p>
            <a href='https://sepolia.etherscan.io/address/0xD1D2e91a8f625100e1456675b49c358291Bc537f'>Địa chỉ hợp đồng khởi tạo bất động sản</a>
          </p>

          <p>
            <a href='https://sepolia.etherscan.io/address/0x85b5706AfEa8E52153cc163599b2A0cd1BDD555c'>Địa chỉ hợp đồng các giao dịch</a>
          </p>
  
          {/* <div class="mt-4">
            <a href='/' type="button" class="btn btn-floating btn-primary btn-lg"><i class="fab fa-facebook-f"></i></a>
            <a href='/' type="button" class="btn btn-floating btn-primary btn-lg"><i class="fab fa-dribbble"></i></a>
            <a href='/' type="button" class="btn btn-floating btn-primary btn-lg"><i class="fab fa-twitter"></i></a>
            <a href='/' type="button" class="btn btn-floating btn-primary btn-lg"><i class="fab fa-google-plus-g"></i></a>
          </div> */}
        </div>
  
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4 pb-1">Tìm hiểu thêm thông tin</h5>
  
          <div class="form-outline form-white mb-4">
            <input type="text" id="formControlLg" class="form-control form-control-lg" placeholder='Nhập email để nhận thêm thông tin'/>
          </div>
  
         
        </div>
  
        {/* <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">Opening hours</h5>
  
          <table class="table text-center text-white">
            <tbody class="font-weight-normal">
              <tr>
                <td>Mon - Thu:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Fri - Sat:</td>
                <td>8am - 1am</td>
              </tr>
              <tr>
                <td>Sunday:</td>
                <td>9am - 10pm</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  
    <div class="text-center p-3" >
      © 2023 Copyright:
      <a class="text-white" href="/"> Ton Duc Thang University</a>
    </div>
  </footer>
  
</div>

  );
}