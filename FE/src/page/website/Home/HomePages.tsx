import { Container } from "@mui/material"
import Banner from "./Banner/Banner"
import ProductList from "./products/ProductsList"

const HomePages = () => {
    return (
        <Container maxWidth="xl">
            <Banner />
            <ProductList />
        </Container>
    )
}

export default HomePages