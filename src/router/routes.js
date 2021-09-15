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
import Labels from  "../pages/label"

export const routes = [
    {name: "Login", path: "/login", component: Login, title: "Login", isNavbar: false},
    {name: "HomePage", path: "/", component: Home, title: "Home", icon: "house-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "ImportPage", path: "/import", component: Import, title: "Import", icon: "upload", isNavbar: true, meta: {requireAuth: true}},
    {name: "ListPage", path: "/list", component: List, title: "List", icon: "list-ul", isNavbar: true, meta: {requireAuth: true}},
    {name: "SubjectPage", path: "/subjects", component: Subject, title: "Subjects", icon: "file-earmark-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "Seller", path: "/sellers", component: Seller, title: "Sellers", icon: "graph-up", isNavbar: true, meta: {requireAuth: true}},
    {name: "PhoneNumberPage", path: "/phones", component: PhoneNumber, title: "Phone Numbers", icon: "telephone-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "EmailPage", path: "/emails", component: Email, title: "Emails", icon: "envelope-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "GoldenAddressPage", path: "/golden-addresses", component: GoldenAddress, title: "Golden Addresses", icon: "geo-alt-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "PropertiesPage", path: "/properties", component: Properties, title: "Properties", icon: "gear", isNavbar: true, meta: {requireAuth: true}},
    {name: "LabelPage", path: "/labels", component: Labels, title: "Labels", isNavbar: false, meta: {requireAuth: true}}
]
