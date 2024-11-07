import axios from '../../axios';
export const getShipperById = async (id: number) => {
    return await axios(
        {
            method: "GET",
            url: `/user/client/${id}`,
        }
    )
}

export const getShipperOrders = async (id: number) => {
    return await axios(
        {
            method: "GET",
            url: `/order/shipper`,
            params: {
                user_id: id
            }
        }
    )
}