import { apis } from "../enums/apis";
import { resp } from "../interfaces/resp";
import { UserInfo } from "../interfaces/UserInfo";
import { asyncPost } from "./fetch";

export const login = async(info:UserInfo)=>{
    const res:resp<string> = await asyncPost(apis.login,info)
    if (res.code == 200) {
        localStorage.setItem('token',res.body);
        return true
    }else{
        return false;
    }
}