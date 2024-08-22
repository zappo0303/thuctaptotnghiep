import { Link } from "react-router-dom";
import banner from "src/assets/bane.png";
import dongho from "src/assets/dongho.png";

const Banner = () => {
    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] relative">
                {/* Phần hình ảnh */}
                <div className="relative">
                    <img
                        src={banner}
                        alt="Banner"
                        className="absolute top-[-30px] left-[140px] z-10 transform rotate-[-35deg] w-[77%]"
                    />
                    {/* Chấm tròn đỏ */}
                    <div className="absolute top-[15%] left-[23%] transform -translate-x-[-50%] -translate-y-[-50%] w-12 h-12 rounded-full bg-[#d44d49] z-10"></div>
                    {/* Chấm tròn vàng */}
                    <div className="absolute top-[15%] left-[15%] transform -translate-x-[-50%] -translate-y-[-50%] w-12 h-12 rounded-full bg-[#f8c538] z-10"></div>
                    {/* Chấm tròn đen */}
                    <div className="absolute top-[15%] left-[31%] transform -translate-x-[-50%] -translate-y-[-50%] w-12 h-12 rounded-full bg-[#040404] z-10"></div>
                    <div className="absolute bg-[#06bf86] rounded-full w-full h-[350px] z-1 mt-20"></div>
                    <img
                        src={dongho}
                        alt=""
                        className="absolute top-[65%] right-[-1%] z-10 rounded-[120px]"
                    />
                </div>
                {/* Phần thông tin */}
                <div className="flex flex-col ml-20 p-5">
                    <h1 className="text-8xl font-semibold">Nike Epic React Flywire</h1>
                    <h4 className="text-4xl font-semibold mt-8">
                        A revolutionary system that adjusts to the shape of your foot
                    </h4>
                    <Link to={``}>
                        <button className=" w-1/2 h-[60px]  bg-black text-white text-lg font-medium rounded-3xl hover:bg-gray-800 mt-6">
                            Buy Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
