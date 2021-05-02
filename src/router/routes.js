import Home from "../pages/home"
import Import from "../pages/import"
import List from "../pages/list"
import Subject from "../pages/subject"
import Seller from "../pages/seller"
import PhoneNumber from "../pages/phoneNumber"
import Email from "../pages/email"
import GoldenAddress from "../pages/goldenAddress"
import Properties from "../pages/properties"
import Login from "../pages/login"

export const routes = [
    {
        name: "Login",
        path: "/login",
        component: Login,
        title: "Login",
        isNavbar: false
    },
    {
        name: "HomePage",
        path: "/",
        component: Home,
        title: "Home",
        icon: "house-fill",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "ImportPage",
        path: "/import",
        component: Import,
        title: "Import",
        icon: "upload",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "ListPage",
        path: "/list",
        component: List,
        title: "List",
        icon: "list-ul",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "SubjectPage",
        path: "/subject",
        component: Subject,
        title: "Subject",
        icon: "file-earmark-fill",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "Seller",
        path: "/seller",
        component: Seller,
        title: "Seller",
        icon: "graph-up",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "PhoneNumberPage",
        path: "/phone-number",
        component: PhoneNumber,
        title: "Phone Number",
        icon: "telephone-fill",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "EmailPage",
        path: "/email-address",
        component: Email,
        title: "Email",
        icon: "envelope-fill",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "GoldenAddressPage",
        path: "/golden-address",
        component: GoldenAddress,
        title: "Golden Address",
        icon: "geo-alt-fill",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    },
    {
        name: "PropertiesPage",
        path: "/properties",
        component: Properties,
        title: "Properties",
        icon: "gear",
        isNavbar: true,
        meta: {
            requireAuth: true
        }
    }
]