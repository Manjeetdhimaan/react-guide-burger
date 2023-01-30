import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-builder-70-default-rtdb.firebaseio.com/"
});

export default instance;