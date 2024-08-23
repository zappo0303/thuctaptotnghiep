import { CategoryFace } from '../../../../interfaces/Category';
import UseCategory from '../../../../hook/useCategory';

const Category = () => {
    const { data, isLoading } = UseCategory();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="my-10 text-base">
                {data && data.map((item: CategoryFace, index: number) => (
                    <a
                        key={index}
                        href={`/category/${item._id}`}
                        className="inline-block no-underline text-gray-500 py-2 px-8 rounded-full border border-gray-500 bg-white transition duration-300 hover:bg-black hover:text-white hover:border-gray-500 ml-2"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Category;
