import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import SocketSingleton from "../../../socket";
import { fetchOrder } from '../../../utils/Order/order.utils';
import { getShipperOrders } from "../shipper.service";
import { useSelector } from "react-redux";

interface ListOrdersProps {
}
const ListOrders: React.FC<ListOrdersProps> = ({
    
}) => {
    const socket = SocketSingleton.getInstance();
    const {id} = useSelector((state: any) => state.userSlice);
    const [list, setList] = useState([]);

    useEffect(() => {
        socket.connect();
        socket.emit("getListOrder", {});

        socket.on('orderOnArrive', (data) => {
            fetchOrders();
        });

        return () => {
            socket.off('orderOnArrive');
        };
    }, []);
    const fetchOrders = async () => {
        const rs = await getShipperOrders(id);
        setList(rs?.data.result);
    }
    useEffect(() => {
        fetchOrders();
    }, [socket]);

    return (
        <div className="bg-main-bg w-full h-full px-5 pt-[50px] flex flex-col justify-start items-start overflow-y-auto gap-2">

            <div className="w-full justify-start items-start ">
                <span className="text-[25px] font-bold">Your orders</span>
            </div>
            <div className="overflow-y-auto scrollbar-hidden flex flex-col h-[80%] w-full gap-2">
                {
                    list.length === 0 && <span className="text-[20px] font-light text-center">No orders here, you are free!!</span>
                }
                {list?.map((order:{
                    order_id: number,
                    delivery_time: string
                }, index) => {
                    return (
                        <OrderCard fetchOrders={fetchOrders} order_id={order.order_id} time={order.delivery_time}/>
                    )
                })}
            </div>
            
        </div>
    )
}
export default ListOrders;