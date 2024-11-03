//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "../Order/components/FilterBar";
import ListOrders from "../Order/components/ListOrder";
import PagingBar from "../../components/commons/PagingBar";

import {getSumHistoryOrders} from "../../utils/Order/order.utils";

export default function HistoryOrder() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const[ params ] = useSearchParams();
    const [totalPage, setTotalPage] = useState<number>(0);
    const limit = 5;

    useEffect(() => {
        getSumHistoryOrders(params).then((data)=>{
      
            setTotalPage(Math.ceil(data/limit));
        });
    }, [params]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);

    return (
        <div className="w-screen h-screen grid grid-cols-6 grid-rows-12 bg-main-bg">
            {/* sidebar */}
            <SideBar />

            {/* content */}
            <div className="w-full h-full bg-main-bg col-span-5 row-span-12">
                <FilterBar />
                <ListOrders isRender={true} history={1}/>
                <PagingBar totalPage={totalPage}/>
            </div>
        </div>
    );
}
