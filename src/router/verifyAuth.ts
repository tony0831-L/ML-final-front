import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { resp } from '../interfaces/resp';
import { asyncGet } from '../utils/fetch';
import { apis } from '../enums/apis';
import { ElMessage } from 'element-plus';

export const verifyAuth = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const result: resp<string> = await asyncGet(`${apis.check}?token=${localStorage.getItem('token')}`)
    if (result.code == 200) {
        next();
    } else {
        ElMessage({
            message: '請先登入😇',
            type: 'success',
        })
        next("/login");
    }
}