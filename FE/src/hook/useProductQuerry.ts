import { getAllProducts, getProductById } from "../services/Products"
import { useQuery } from "react-query"

const useProductQuerry = (id?: number | string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["PRODUCTS_KEY", id],
        queryFn: async () => {
            return id ? await getProductById(id) : await getAllProducts();
        }
    })
    return { data, ...rest }
}


export default useProductQuerry