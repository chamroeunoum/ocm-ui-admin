import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './plugins/authentication'
import LoginComponent from './layouts/login/index.vue'
import DashboardComponent from './layouts/dashboard/index.vue'
import DashboardWidget from './components/main/dashboard.vue'
/**
 * User Components
 */
import UserCrud from './components/user/index.vue'
import UserListCrud from './components/user/list.vue'
import UserCreateCrud from './components/user/create.vue'
import UserUpdateCrud from './components/user/update.vue'
import UserDetail from './components/user/detail.vue'

/**
 * Folder Components
 */
import FolderCrud from './components/folder/index.vue'
import FolderListCrud from './components/folder/list.vue'
import FolderCreateCrud from './components/folder/create.vue'
import FolderUpdateCrud from './components/folder/update.vue'
import FolderDetail from './components/folder/detail.vue'

/**
 * Regulator Components
 */
 import RegulatorCrud from './components/regulator/index.vue'
 import RegulatorListCrud from './components/regulator/list.vue'
 import RegulatorChildCrud from './components/regulator/child.vue'
//  import RegulatorCreateCrud from './components/regulator/create.vue'
//  import RegulatorUpdateCrud from './components/regulator/update.vue'

import Orgchart from './components/regulator/orgchart.vue'

/**
 * Client Components
 */
import ClientCrud from './components/client/index.vue'
/**
 * Staff Components
 */
import StaffCrud from './components/staff/index.vue'
/**
 * Error
 */
import Page404 from './components/errors/404.vue'
let routes = [] 
if( !isAdmin() ){
    routes = [{ 
        path: '', 
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/login'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            transition: 'slide-left'
        }
    },
    /**
     * Dashboard
     */
    {
        name: "Dashboard" ,
        path: '/dashboard',
        component: DashboardComponent,
        meta: {
            transition: 'slide-left' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [{
            name: 'DashboardWidgets' ,
            path: '',
            component: DashboardWidget ,
            meta : {
                transition: 'slide-left' ,
                requiresAuth: true ,
                is_admin : true
            }
        },
        {
            name: 'User' ,
            path: '/user',
            component: UserCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "UserList" ,
                    path: '' ,
                    component: UserListCrud
                },
                {
                    name: "UserDetail" ,
                    path: ':id/detail' ,
                    component: UserDetail
                },
                {
                    name: "UserCreate" ,
                    path: 'create' ,
                    component: UserCreateCrud
                },
                {
                    name: "UserUpdate" ,
                    path: 'update' ,
                    component: UserUpdateCrud
                }
            ]
        },
        // Folder
        {
            name: 'Folder' ,
            path: '/folder',
            component: FolderCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "FolderList" ,
                    path: '' ,
                    component: FolderListCrud
                },
                {
                    name: "FolderDetail" ,
                    path: ':id/detail' ,
                    component: FolderDetail
                },
                {
                    name: "FolderCreate" ,
                    path: 'create' ,
                    component: FolderCreateCrud
                },
                {
                    name: "FolderUpdate" ,
                    path: 'update' ,
                    component: FolderUpdateCrud
                }
            ]
        },
        {
            name: 'Regulator' ,
            path: '/regulator',
            component: RegulatorCrud ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "RegulatorList" ,
                    path: '' ,
                    component: RegulatorListCrud
                },
                // {
                //     name: "RegulatorUpdate" ,
                //     path: 'update' ,
                //     component: RegulatorUpdateCrud
                // }
                {
                    name: "RegulatorChild" ,
                    path: 'child/:id' ,
                    props: true,
                    component: RegulatorChildCrud
                },
            ]
        },
        {
            name: 'RegulatorOrgchart' ,
            path: '/orgchart' ,
            component: Orgchart
        }],
    }]
}else{
    routes = [{ 
        path: '', 
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/login'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            transition: 'slide-left'
        }
    },
    /**
     * Dashboard
     */
    {
        name: "Dashboard" ,
        path: '/dashboard',
        component: DashboardComponent,
        meta: {
            transition: 'slide-left' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [{
            name: 'DashboardWidgets' ,
            path: '',
            component: DashboardWidget ,
            meta : {
                transition: 'slide-left' ,
                requiresAuth: true ,
                is_admin : true
            }
        }]
    }]
}

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Meta Handling
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !isAuth() ){
        if( to.path.includes('/readpackage') ) next()
        else{
            next({ path: '/login' })
        }
    }
    else if (to.path == '/login' && isAuth() ) {
        next({ path: '/dashboard' })
        // if( isAdmin() ){
        //     next({ path: '/dashboard' })
        // }else{
        //     next({ path: '/receive' })
        // }
    }
    else {
        next()
    }
})
// .beforeResolve(async to => {
//     if (to.meta.requiresCamera) {
//         try {
//         await askForCameraPermission()
//         } catch (error) {
//         if (error instanceof NotAllowedError) {
//             // ... handle the error and then cancel the navigation
//             return false
//         } else {
//             // unexpected error, cancel the navigation and pass the error to the global handler
//             throw error
//         }
//         }
//     }
// })

export default router