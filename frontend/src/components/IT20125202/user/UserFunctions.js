//for registration
import axios from "axios";

export const userRegister = newUser => {
    return axios.post('http://localhost:5000/user/registration', {
            idNumber: newUser.idNumber,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
            type: newUser.type,
            password: newUser.password,
        })
        .then(res => {
            if (res.data.success) {
                // window.alert('Registered successfully!');
            }
        })
        .catch(err => {
            return err
        })
} 