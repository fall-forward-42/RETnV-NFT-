// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;//số lượng ntf đã tạo trong contract này

    constructor() ERC721("Real Estate Transactions And Verification", "RETnV"){} //cho hai tham số là name và biểu tượng của NFT
    function mint(string memory _tokenURI) external returns(uint) { //chứa link của NFT trên IPFS - trả về id của token vừa dc tạo
        tokenCount ++;
        _safeMint(msg.sender, tokenCount);//gán người tạo cho cái token đó
        _setTokenURI(tokenCount, _tokenURI); // set token
        return(tokenCount);
    }
}