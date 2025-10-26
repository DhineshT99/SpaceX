import axios from "axios";

const BASE_URL = "https://api.spacexdata.com/v4";

export const getRockets = () => axios.get(`${BASE_URL}/rockets`);
export const getRocketById = (id: string) => axios.get(`${BASE_URL}/rockets/${id}`);
export const getLaunches = () => axios.get(`${BASE_URL}/launches`);
export const getHistory = () => axios.get(`${BASE_URL}/history`);
