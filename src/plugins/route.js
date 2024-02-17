import { isBackend , isAuth } from './authentication'
import LoginComponent from './../layouts/login/index.vue'
import DashboardComponent from './../components/main/index.vue'
import DashboardWidget from './../components/main/dashboard.vue'
/**
 * User Components
 */
import UserCrud from './../components/user/index.vue'
import UserListCrud from './../components/user/list.vue'
import UserCreateCrud from './../components/user/create.vue'
import UserUpdateCrud from './../components/user/update.vue'
import UserDetail from './../components/user/detail.vue'

/**
 * Prople Components
 */
import PeopleCrud from './../components/people/index.vue'
import PeopleListCrud from './../components/people/list.vue'
import PeopleCreateCrud from './../components/people/create.vue'
import PeopleUpdateCrud from './../components/people/update.vue'
import PeopleDetail from './../components/people/detail.vue'

import ProfileIndex from './../components/user/profile/index.vue'
import ProfileInformation from './../components/user/profile/profile.vue'

/**
 * Folder Components
 */
import FolderCrud from './../components/folder/index.vue'
import FolderListCrud from './../components/folder/list.vue'
import FolderCreateCrud from './../components/folder/create.vue'
import FolderUpdateCrud from './../components/folder/update.vue'
import FolderDetail from './../components/folder/detail.vue'
import FolderRegulatorComponent from './../components/folder/regulator.vue'

/**
 * Folder Components
 */
// import RoleCrud from './../components/role/index.vue'
// import RoleListCrud from './../components/role/list.vue'
// import RoleCreateCrud from './../components/role/create.vue'
// import RoleUpdateCrud from './../components/role/update.vue'
// import RoleDetail from './../components/role/detail.vue'

/**
 * Regulator Components
 */
 import RegulatorCrud from './../components/regulator/index.vue'
 import RegulatorListCrud from './../components/regulator/list.vue'
 import RegulatorChildCrud from './../components/regulator/child.vue'
//  import RegulatorCreateCrud from './../components/regulator/create.vue'
//  import RegulatorUpdateCrud from './../components/regulator/update.vue'

/**
 * Organization Components
 */
import OrganizationCrud from './../components/organization/index.vue'
import OrganizationListCrud from './../components/organization/list.vue'
import OrganizationOrgchart from './../components/organization/orgchart.vue'


/**
 * Attendant Components
 */
import AttendantCrud from './../components/attendant/index.vue'
import AttendantListCrud from './../components/attendant/list.vue'
import AttendantMonthlyCrud from './../components/attendant/monthly.vue'


import Orgchart from './../components/regulator/orgchart.vue'

/**
 * Error
 */
import Page404 from './../components/errors/404.vue'

export const getRoutes = () => {
    if( isBackend() ){
        return [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/login'
                }
            },
            {
                name: 'Login',
                path: '/login',
                component: LoginComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            /**
             * Dashboard
             */
            {
                name: "DashboardPage" ,
                path: '/dashboard',
                component: DashboardComponent,
                meta: {
                    transition: 'slide-left' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: 'DashboardWidgets' ,
                        path: '',
                        component: DashboardWidget ,
                        meta : {
                            transition: 'slide-left' ,
                            requiresAuth: true ,
                            is_admin : true
                        }
                    }
                ]
            },
            {
                name: "UserProfile" ,
                path: '/profile' ,
                component: ProfileIndex ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children:[
                {
                    name: "ProfileInformation" ,
                    path: '' ,
                    component: ProfileInformation ,
                    meta: { 
                        transition: 'slide-right' ,
                        requiresAuth: true,
                        is_admin : true
                    },
                }  
                ]
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
            {
                name: 'People' ,
                path: '/people',
                component: PeopleCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "PeopleList" ,
                        path: '' ,
                        component: PeopleListCrud
                    },
                    {
                        name: "PeopleDetail" ,
                        path: ':id/detail' ,
                        component: PeopleDetail
                    },
                    {
                        name: "PeopleCreate" ,
                        path: 'create' ,
                        component: PeopleCreateCrud
                    },
                    {
                        name: "PeopleUpdate" ,
                        path: 'update' ,
                        component: PeopleUpdateCrud
                    }
                ]
            },
            {
                name: 'Attendant' ,
                path: '/attendant',
                component: AttendantCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "AttendantList" ,
                        path: '' ,
                        component: AttendantListCrud
                    },
                    {
                        name: 'AttendantMonthly' ,
                        path: ':date/month/:userId/user' ,
                        component: AttendantMonthlyCrud
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
                    },
                    {
                        name: "FolderRegulators" ,
                        path: ':id/regulators' ,
                        component: FolderRegulatorComponent
                    },
                ]
            },
            // Role
            // {
            //     name: 'Role' ,
            //     path: '/role',
            //     component: RoleCrud ,
            //     meta: { 
            //         transition: 'slide-right' ,
            //         requiresAuth: true,
            //         is_admin : true 
            //     },
            //     children: [
            //         {
            //             name: "RoleList" ,
            //             path: '' ,
            //             component: RoleListCrud
            //         },
            //         {
            //             name: "RoleDetail" ,
            //             path: ':id/detail' ,
            //             component: RoleDetail
            //         },
            //         {
            //             name: "RoleCreate" ,
            //             path: 'create' ,
            //             component: RoleCreateCrud
            //         },
            //         {
            //             name: "RoleUpdate" ,
            //             path: 'update' ,
            //             component: RoleUpdateCrud
            //         }
            //     ]
            // },
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
            // Folder
            {
                name: 'Organization' ,
                path: '/organization',
                component: OrganizationCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OrganizationList" ,
                        path: '' ,
                        component: OrganizationOrgchart
                    },
                    {
                        name: 'OrganizationOrgchart' ,
                        path: 'orgchart' ,
                        component: OrganizationOrgchart ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                ]
            },
            // {
            //     name: 'RegulatorOrgchart' ,
            //     path: '/orgchart' ,
            //     component: Orgchart ,
            //     meta: { 
            //         transition: 'slide-right' ,
            //         requiresAuth: true,
            //         is_admin : true
            //     }
            // },
            // will match everything and put it under `$route.params.pathMatch`
            { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
        ]
    }
    
    return [
        { 
            path: '', 
            name: "EmptyURI" ,
            redirect: to => {
                return '/login'
            }
        },
        { 
            path: '/', 
            name: "RootURI" ,
            redirect: to => {
                return '/login'
            }
        },
        {
            name: 'Login',
            path: '/login',
            component: LoginComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
}