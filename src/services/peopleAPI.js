import axios from 'axios';

 const API = 'https://jsonplaceholder.typicode.com/users'

export const sendPeopleRequest = async () => {
    try {
        const response = await axios.get(`${API}`)
        return response.data
    }
    catch (err) {
        throw Error(err)
    }
};