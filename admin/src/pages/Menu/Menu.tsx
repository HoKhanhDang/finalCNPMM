//components
import SideBar from "../../components/commons/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./Components/FilterBar";
import ListItems from "./Components/ListItems";

import {getSumFoodAPI} from "./menu.service";
import PagingBar from "../../components/commons/PagingBar";
import FormAdd from "./Components/FormAdd";
import FormEdit from "./Components/FormEdit";

const Menu = () => {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const [isRender, setIsRender] = useState(false);
    const [params] = useSearchParams();
    const [page, setPage] = useState(1);
    const limit = 5;

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [m_id, setM_id] = useState("");
    const handleEdit= (isEdit: boolean, m_id: string) => {
        setIsEdit(isEdit);
        setM_id(m_id);       
    }

    //api paging
    const getSumFood = async () => {
        try {
            const data = {
                status: params.get("status"),
                title: params.get("title"),
            };
    
            // Gọi API để lấy dữ liệu
            const res = await getSumFoodAPI(data);
    
            // Kiểm tra xem dữ liệu trả về có đúng định dạng không
            if (res && res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
                const sum = res.data.data[0].Sum; // Lấy giá trị Sum
                setPage(Math.ceil(sum / limit)); // Cập nhật trang
            } else {
                console.error("Unexpected response structure:", res);
                setPage(0); // Hoặc xử lý theo cách khác nếu không có dữ liệu
            }
        } catch (error) {
            console.error("Error fetching sum:", error);
            setPage(0); // Hoặc xử lý theo cách khác nếu có lỗi
        }
    };

    useEffect(() => {  
        getSumFood();
        setIsRender(!isRender);
    }, [params, isAdd, isEdit]);

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
                {
                    isAdd && <FormAdd setIsAdd={setIsAdd}/>
                }
                {
                    isEdit && <FormEdit m_id={m_id} setIsEdit={setIsEdit}/>
                }
                <FilterBar setIsAdd={setIsAdd} />
                <ListItems setIsEdit={handleEdit} isRender={isRender}/>
                <PagingBar totalPage={page} />
            </div>
        </div>
    );
}

export default Menu;
