interface ImgProductDetailProps {
    product: {
        imgCategory: string[];
        name: string;
    };
}

const ImgProductDetail = ({ product }: ImgProductDetailProps) => {
    return (
        <div>
            {product.imgCategory.map((imgUrl, index) => (
                <div
                    key={index}
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mb-7"
                >
                    <img src={imgUrl} alt={product.name} className="max-w-full h-auto" />
                </div>
            ))}
        </div>
    );
};

export default ImgProductDetail;
