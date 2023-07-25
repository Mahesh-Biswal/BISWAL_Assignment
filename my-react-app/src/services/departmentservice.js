import axios from 'axios';

export class DepartmentService {
    constructor(){
        this.url = 'http://localhost:3043/department';
    }

    getData(){
        let response = axios.get(this.url);
        return response;
    }
    postData(dept){
        let response = axios.post(this.url, dept, {
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response;
    }
    putData(id,dept){
        let response = axios.put(`${this.url}/${id}`, dept, {
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response;
    }
    deleteData(id){
        let response = axios.delete(`${this.url}/${id}`);
        return response;
    }

}
