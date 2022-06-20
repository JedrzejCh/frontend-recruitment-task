import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/users'

export const sendPeopleRequest = async () => {
    try {
        const response = await axios.get(`${API}`)
        console.log(response)
        return response
    } 
    catch (err) {
        console.error(err);
    }
};