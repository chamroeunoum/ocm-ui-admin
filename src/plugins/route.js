import { isBackend , isAuth } from './authentication'
import LoginComponent from './../layouts/login/index.vue'
import DashboardComponent from './../components/main/index.vue'
import DashboardWidget from './../components/main/dashboard.vue'

/**
 * Card Officer
 */
import DetailCardComponent from './../layouts/staff/card.vue'
/**
 * Check in and out
 */
import QrCheckinAndCheckoutComponent from './../layouts/checkinout/check.vue'
import QrCheckinAndCheckoutCameraComponent from './../layouts/checkinout/qrcheck.vue'

/**
 * User Components
 */
import UserCrud from './../components/user/index.vue'
import UserTableCrud from './../components/user/listing/table.vue'
import UserThumbnailCrud from './../components/user/listing/thumbnail.vue'
import UserCreateCrud from './../components/user/widgets/create.vue'
import UserUpdateCrud from './../components/user/widgets/update.vue'

/**
 * Prople Components
 */
import ProfileIndex from './../components/user/profile/index.vue'
import ProfileInformation from './../components/user/profile/profile.vue'

/**
 * Officer Components
 */
import OfficerCrud from './../components/officer/index.vue'
import OfficerThumbnailCrud from './../components/officer/listing/thumbnail.vue'

/**
 * Room Components
 */
import RoomCrud from './../components/room/index.vue'
import RoomThumbnailCrud from './../components/room/listing/thumbnail.vue'


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
 import RegulatorThumbnailCrud from './../components/regulator/listing/thumbnail.vue'
 import RegulatorChildCrud from './../components/regulator/child.vue'
//  import RegulatorCreateCrud from './../components/regulator/create.vue'
//  import RegulatorUpdateCrud from './../components/regulator/update.vue'

/**
 * Organization Components
 */
import OrganizationCrud from './../components/organization/index.vue'
import OrganizationThumbnailCrud from './../components/organization/thumbnail.vue'
import OrganizationOrgchart from './../components/organization/orgchart.vue'
import OrganizationDetails from './../components/organization/details.vue'

/**
 * Positions
 */
import PositionCrud from './../components/position/index.vue'
import PositionThumbnailCrud from './../components/position/thumbnail.vue'
import PositionOrgchart from './../components/position/orgchart.vue'
import PositionDetails from './../components/position/details.vue'

/**
 * Attendant Components
 */
import AttendantCrud from './../components/attendant/index.vue'
import AttendantListCrud from './../components/attendant/list.vue'
import AttendantMonthlyCrud from './../components/attendant/monthly.vue'


import QRComponent from './../components/qrcodes/index.vue'
import QRListComponent from './../components/qrcodes/list.vue'
import QRCheckinComponent from './../components/qrcodes/checkin.vue'

/**
 * Task Components
 */
import TaskCrud from './../components/task/index.vue'
import TaskListCrud from './../components/task/list.vue'

/**
 * Law book Components
 */
import LawCrud from './../components/law/index.vue'
import LawListCrud from './../components/law/listing/thumbnail.vue'
import LawBookContent from './../components/law/listing/content.vue'

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
                        name: "UserTable" ,
                        path: '' ,
                        component: UserThumbnailCrud // UserTableCrud
                    },
                    {
                        name: "UserThumbnail" ,
                        path: 'thumbnail' ,
                        component: UserThumbnailCrud
                    }
                ]
            },
            {
                name: 'Officer' ,
                path: '/officer',
                component: OfficerCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OfficerTable" ,
                        path: '' ,
                        component: OfficerThumbnailCrud // UserTableCrud
                    },
                    {
                        name: "OfficerThumbnail" ,
                        path: 'thumbnail' ,
                        component: OfficerThumbnailCrud
                    },
                    {
                        name: "OfficerThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: OfficerThumbnailCrud
                    },
                    // {
                    //     name: "PeopleExportCrud" ,
                    //     path: 'export' ,
                    //     component: PeopleExportCrud
                    // },
                    // {
                    //     name: "PeopleList" ,
                    //     path: '' ,
                    //     component: PeopleListCrud
                    // },
                    // {
                    //     name: "PeopleDetail" ,
                    //     path: ':id/detail' ,
                    //     component: PeopleDetail
                    // },
                    // {
                    //     name: "PeopleCreate" ,
                    //     path: 'create' ,
                    //     component: PeopleCreateCrud
                    // },
                    // {
                    //     name: "PeopleUpdate" ,
                    //     path: 'update' ,
                    //     component: PeopleUpdateCrud
                    // }
                ]
            },
            {
                name: 'Room' ,
                path: '/room',
                component: RoomCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "RoomTable" ,
                        path: '' ,
                        component: RoomThumbnailCrud // UserTableCrud
                    },
                    {
                        name: "RoomThumbnail" ,
                        path: 'thumbnail' ,
                        component: RoomThumbnailCrud
                    },
                    {
                        name: "RoomThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: RoomThumbnailCrud
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
                    },
                    {
                        name: 'QRListComponent' ,
                        path: 'qrlist' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckinComponent' ,
                        path: 'qrcheckin' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            {
                name: 'QRCodes' ,
                path: '/qrcodes',
                component: QRComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "QRCodesList" ,
                        path: '' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckin' ,
                        path: 'checkin/:id' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            {
                name: 'Task' ,
                path: '/task',
                component: TaskCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "TaskList" ,
                        path: '' ,
                        component: TaskListCrud
                    }
                ]
            },
            {
                name: 'Law' ,
                path: '/law',
                component: LawCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "LawList" ,
                        path: '' ,
                        component: LawListCrud
                    }
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
                        component: RegulatorThumbnailCrud
                    },
                    {
                        name: "RegulatorThumbnailCrud" ,
                        path: 'thumbnail' ,
                        component: RegulatorThumbnailCrud
                    },
                    {
                        name: "RegulatorChild" ,
                        path: 'child/:id' ,
                        props: true,
                        component: RegulatorChildCrud
                    },
                ]
            },
            // Organization
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
                        component: OrganizationThumbnailCrud ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    {
                        name: "SubOrganizationList" ,
                        path: ':rootId/sub' ,
                        component: OrganizationThumbnailCrud ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
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
                    {
                        name: 'OrganizationDetails' ,
                        path: ':id/details' ,
                        component: OrganizationDetails ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    
                ]
            },
            // Position
            {
                name: 'Position' ,
                path: '/position',
                component: PositionCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "PositionList" ,
                        path: '' ,
                        component: PositionThumbnailCrud ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    {
                        name: "SubPositionList" ,
                        path: ':rootId/sub' ,
                        component: PositionThumbnailCrud ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    {
                        name: 'PositionOrgchart' ,
                        path: 'orgchart' ,
                        component: PositionOrgchart ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    {
                        name: 'PositionDetails' ,
                        path: ':id/details' ,
                        component: PositionDetails ,
                        meta: { 
                            transition: 'slide-right' ,
                            requiresAuth: true,
                            is_admin : true
                        }
                    },
                    
                ]
            },
            {
                name: 'OfficerCard',
                path: '/officer/card/:id',
                component: DetailCardComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'QrCheckinAndCheckoutComponent',
                path: '/officer/checkinout/:id',
                component: QrCheckinAndCheckoutComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'QrCheckinAndCheckoutCameraComponent',
                path: '/officer/checkinout/:id/camera',
                component: QrCheckinAndCheckoutCameraComponent ,
                meta: {
                    // transition: 'fade'
                }
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
        {
            name: 'OfficerCard',
            path: '/officer/card/:id',
            component: DetailCardComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutComponent',
            path: '/officer/checkinout/:id',
            component: QrCheckinAndCheckoutComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutCameraComponent',
            path: '/officer/checkinout/:id/camera',
            component: QrCheckinAndCheckoutCameraComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
}