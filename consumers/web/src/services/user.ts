import {
  getRequest,
  deleteRequest,
  postRequest,
  putRequest,
} from "../utils/request";
import config from "../utils/config";

interface ILoginInput {
    email: string;
    password: string;
}

interface IRegisterInput {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

interface IListParams {
    current: number;
    next: number;
    per_page: number;
}

interface IEditParams {
    first_name: string;
    last_name: string;
    id: number;
}

export default class User {

    login(params: ILoginInput){
        return postRequest(config.base_path + '/login', params);
    }

    register(params: IRegisterInput){
        return postRequest(config.base_path + '/users', params);
    }

    list(params: IListParams){
        return getRequest(config.base_path + '/users', params);
    }

    edit(params: IEditParams){
        return putRequest(config.base_path + `/users/${params.id}`, params);
    }

    delete(id: string){
        return deleteRequest(config.base_path + `/users/${id}`);
    }
}
