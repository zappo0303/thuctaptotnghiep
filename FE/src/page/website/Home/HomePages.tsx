import { Container } from "@mui/material"
import Banner from "./Banner/Banner"
import ProductList from "./products/ProductsList"
import CategoryList from "./Category/Category"

const HomePages = () => {
    return (
        <Container maxWidth="xl">
            <Banner />
            <CategoryList />
            <ProductList />
        </Container>
    )
}

export default HomePages