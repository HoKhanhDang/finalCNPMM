import axios from "../../../axios";

export const apiRegister = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/customer/register",
        params: data,
    });
};
export const sendEmail = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/customer/request-otp",
        params: data,
    });
};
export const verifyEmail = async (data: any) => {
    try {
        return await axios({
            method: "POST",
            url: "/customer/verify-otp",
            params: data,
        });
    } catch (error) {
        console.log(error);
    }
   
};
