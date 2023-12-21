import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import market from './market.png'
import logo from '../components/img/iconLogo.png'
import { HiHomeModern,HiCloudArrowUp,HiMiniInboxStack ,HiTrophy ,HiWallet   } from "react-icons/hi2";

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} width="40" height="40" className="" alt="" />
                    &nbsp; Real Estate Transactions and Verification
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"><HiHomeModern /> Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/create"><HiCloudArrowUp /> Tạo mới</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items"><HiMiniInboxStack /> Danh sách của tôi</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases"><HiTrophy /> Sở hữu</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Kết nối đến ví ngay <HiWallet /></Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;