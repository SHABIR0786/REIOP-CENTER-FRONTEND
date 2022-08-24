import Home from "../pages/home"
import User from "../pages/users"
import List from "../pages/list"
import Subject from "../pages/subject"
import Seller from "../pages/seller"
import Company from "../pages/company"
import PhoneNumber from "../pages/phoneNumber"
import Email from "../pages/email"
import GoldenAddress from "../pages/goldenAddress"
import Properties from "../pages/properties"
import Login from "../pages/login"
import Labels from  "../pages/label"
import BackgroundProcesses from "../pages/backgroundProcesses"
import Error from "../pages/error"
import Team from "../pages/team"
import phoneTypes from "@/pages/phoneTypes";
import subjectTypes from "@/pages/subjectTypes";
import companyTypes from "@/pages/companyTypes";
import marketingChannels from "@/pages/marketingChannels";
import sourceLists from "@/pages/sourceLists";
import skipSourceLists from "@/pages/skipSourceLists";
import seneryError from "@/pages/seneryError";
import activity from "@/pages/activity";

export const routes = [
    {name: "Login", path: "/login", component: Login, title: "Login", isNavbar: false},
    {name: "Home", path: "/", component: Home, title: "Home", icon: "house-fill", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: false, adminMode: true, isURL: false}},
    {name: "Users", path: "/users", component: User, title: "Users", icon: "person", isNavbar: true, meta: {requireAuth: true, roles:["superadmin"], collapse: false, adminMode: true, isURL: false}},
    {name: "Company", path: "/company", component: Company, title: "Companies", icon: "building", isNavbar: true, meta: {requireAuth: true, roles:["superadmin"], collapse: false, adminMode: true, isURL: false}},
    {name: "Activity", path: "/activity-v2", component: activity, title: "Activity", src:"pulse.svg", icon: "upload", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"],collapse: false, adminMode: false, isURL: true}},
    {name: "Activity", path: "/activity", component: activity, title: "Activity", src:"pulse.svg", icon: "upload", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"],collapse: false, adminMode: false, isURL: true}},
    {name: "List", path: "/list", component: List, title: "List", icon: "list-ul", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: false, adminMode: false, isURL: false}},
    {name: "Subject", path: "/subjects", component: Subject, title: "Subjects", icon: "file-earmark-fill", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: true, adminMode: false, isURL: false}},
    {name: "Seller", path: "/sellers", component: Seller, title: "Sellers", icon: "graph-up", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: true, adminMode: false, isURL: false}},
    {name: "PhoneNumber", path: "/phones", component: PhoneNumber, title: "Phone Numbers", icon: "telephone-fill", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: true, adminMode: false, isURL: false}},
    {name: "Email", path: "/emails", component: Email, title: "Emails", icon: "envelope-fill", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: true,adminMode: false, isURL: false}},
    {name: "GoldenAddress", path: "/golden-addresses", component: GoldenAddress, title: "Golden Addresses", icon: "geo-alt-fill", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: true ,adminMode: false, isURL: false}},
    {name: "Properties", path: "/properties", component: Properties, title: "Properties", icon: "gear", isNavbar: true, meta: {requireAuth: true, roles:["admin","superadmin"], collapse: false, adminMode: false}},
    {name: "Label", path: "/labels", component: Labels, title: "Labels", isNavbar: false, meta: {requireAuth: true, admin:["admin","superadmin"], isURL: false}},
    {name: "BackgroundProcesses", path: "/background-processes", component: BackgroundProcesses, title: "Background Processes", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"], isURL: false}},
    {name: "Error", path: "/errors", component: Error, title: "Errors", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"], isURL: false}},
    {name: "Teams", path: "/teams", component: Team, title: "Teams", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "PhoneTypes", path: "/phoneTypes", component: phoneTypes, title: "Phone Types", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "SubjectTypes", path: "/subjectTypes", component: subjectTypes, title: "Subject Types", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "CompanyTypes", path: "/companyTypes", component: companyTypes, title: "Company Types", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "ListSources", path: "/Listsources", component: sourceLists, title: "List Sources", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "SkipSourceLists", path: "/skipSourceLists", component: skipSourceLists, title: "Skip Source Lists", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "marketingChannels", path: "/marketingChannels", component: marketingChannels, title: "Marketing Channels", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
    {name: "senery-error", path: "/senery-error", component: seneryError, title: "senery error", isNavbar: false, meta: {requireAuth: true, roles:["admin","superadmin"]}},
]
