import FormatCurrency from "../../../utils/common/FormatCurrency";
import { addItem } from "../../../redux/slice/cart.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { getFoodNutrition } from "../../../utils/nutri/nutri.util";
import { INutrition } from "../../../types/INutrition";
import NutritionShow from "./NutritionShow";

interface ItemDetailProps {
    title: string;
    detail: string;
    image: string;
    id: number;
    price: number;
}
const ItemDetail: React.FC<ItemDetailProps> = ({
    detail,
    image,
    price,
    id,
    title,
}) => {
    const dispatch = useDispatch();

    const { data } = useQuery({
        queryKey: ["menu", id],
        queryFn: () =>
            getFoodNutrition({
                item_id: id,
            }),
    });
    const handleAddToCart = () => {
        dispatch(
            addItem({
                id,
                title,
                price: Number(price),
                quantity: 1,
                total: Number(price),
                image,
            })
        );
        toast.success("Add to cart successfully");
    };
    return (
        <>
            <div className="flex max-sm:flex-col sm:flex-row w-full h-auto md:px-[100px]">
                <div className="max-sm:w-full sm:w-1/2 h-full p-[50px]">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-sm:w-full sm:w-1/2 flex flex-col justify-center items-center p-5 gap-5">
                    <span className="text-[15px] font-normal">{detail}</span>

                    <NutritionShow data={data as INutrition} />
                    <div className="text-[40px] font-semibold animate-bounce">
                        {FormatCurrency(price)}
                    </div>
                    <div
                        onClick={handleAddToCart}
                        className="bg-red-500 text-white hover:bg-red-300 cursor-pointer rounded-xl flex justify-center items-center h-[50px] w-1/2"
                    >
                        Add to cart
                    </div>
                </div>
            </div>
        </>
    );
};
export default ItemDetail;
