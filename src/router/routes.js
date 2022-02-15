import Home from "../pages/home"
// import Import from "../pages/import"
import List from "../pages/list"
import Subject from "../pages/subject"
import Seller from "../pages/seller"
import PhoneNumber from "../pages/phoneNumber"
import Email from "../pages/email"
import GoldenAddress from "../pages/goldenAddress"
import Properties from "../pages/properties"
import Login from "../pages/login"
import Labels from  "../pages/label"
import BackgroundProcesses from "../pages/backgroundProcesses"
import Error from "../pages/error"
import Import from "../pages/importV2"
import Team from "../pages/team"
import phoneTypes from "@/pages/phoneTypes";
import subjectTypes from "@/pages/subjectTypes";
import companyTypes from "@/pages/companyTypes";

export const routes = [
    {name: "Login", path: "/login", component: Login, title: "Login", isNavbar: false},
    {name: "Home", path: "/", component: Home, title: "Home", icon: "house-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "Import", path: "/import-v2", component: Import, title: "Import V2", icon: "upload", isNavbar: true, meta: {requireAuth: true}},
    // {name: "Import", path: "/import", component: Import, title: "Import", icon: "upload", isNavbar: true, meta: {requireAuth: true}},
    {name: "List", path: "/list", component: List, title: "List", icon: "list-ul", isNavbar: true, meta: {requireAuth: true}},
    {name: "Subject", path: "/subjects", component: Subject, title: "Subjects", icon: "file-earmark-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "Seller", path: "/sellers", component: Seller, title: "Sellers", icon: "graph-up", isNavbar: true, meta: {requireAuth: true}},
    {name: "PhoneNumber", path: "/phones", component: PhoneNumber, title: "Phone Numbers", icon: "telephone-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "Email", path: "/emails", component: Email, title: "Emails", icon: "envelope-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "GoldenAddress", path: "/golden-addresses", component: GoldenAddress, title: "Golden Addresses", icon: "geo-alt-fill", isNavbar: true, meta: {requireAuth: true}},
    {name: "Properties", path: "/properties", component: Properties, title: "Properties", icon: "gear", isNavbar: true, meta: {requireAuth: true}},
    {name: "Label", path: "/labels", component: Labels, title: "Labels", isNavbar: false, meta: {requireAuth: true}},
    {name: "BackgroundProcesses", path: "/background-processes", component: BackgroundProcesses, title: "Background Processes", isNavbar: false, meta: {requireAuth: true}},
    {name: "Error", path: "/errors", component: Error, title: "Errors", isNavbar: false, meta: {requireAuth: true}},
    {name: "Teams", path: "/teams", component: Team, title: "Teams", isNavbar: false, meta: {requireAuth: true}},
    {name: "PhoneTypes", path: "/phoneTypes", component: phoneTypes, title: "Phone Types", isNavbar: false, meta: {requireAuth: true}},
    {name: "SubjectTypes", path: "/subjectTypes", component: subjectTypes, title: "Subject Types", isNavbar: false, meta: {requireAuth: true}},
    {name: "CompanyTypes", path: "/companyTypes", component: companyTypes, title: "Company Types", isNavbar: false, meta: {requireAuth: true}},
]
