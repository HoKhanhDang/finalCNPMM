import axios from "../../axios";

export const apiGetProfile = async (_id: number) => {
    return await axios({
        method: "GET",
        url: "/user/getCustomerById",
        params: { _id },
    });
};


