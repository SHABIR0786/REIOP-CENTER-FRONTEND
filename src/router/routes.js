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
import Forgot from "../pages/forgot"
import resetPassword from "../pages/resetPassword"
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
import teamAdmin from "@/pages/teamAdmin";
import plans from "@/pages/plans";
import companyAdmin from "@/pages/companyAdmin";




export const routes = [
    {name: "Login", path: "/login", component: Login, title: "Login", isNavbar: false},
    {name: "Forgot", path: "/forgotPassword", component: Forgot, title: "Forgot", isNavbar: false},
    {name: "resetPassword", path: "/resetPassword", component: resetPassword, title: "Reset Password", isNavbar: false},
    {name: "Home", path: "/", component: Home, title: "Home", icon: "house-fill", isNavbar: true, meta: {requireAuth: true, roles:[2,1], collapse: false, adminMode: true, isURL: false}},
    {name: "Users", path: "/users", component: User, title: "Users", icon: "people-fill", isNavbar: true, meta: {requireAuth: true, roles:[1], collapse: false, adminMode: true, isURL: false}},
    {name: "Company", path: "/company", component: Company, title: "Companies", icon: "building", isNavbar: true, meta: {requireAuth: true, roles:[1], collapse: false, adminMode: true, isURL: false}},
    {name: "Teams", path: "/teams", component: Team, title: "Teams", icon: "people-fill", isNavbar: true, meta: {requireAuth: true, roles:[1],collapse: false, adminMode: true, isURL: false}},
    {name: "Activity", path: "/activity-v2", component: activity, title: "Activity", src:"pulse.svg", icon: "upload", isNavbar: false, meta: {requireAuth: true, roles:[1,2,3,4],collapse: false, adminMode: false, isURL: true}},
    {name: "Activity", path: "/activity", component: activity, title: "Activity", src:"pulse.svg", icon: "upload", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4],collapse: false, adminMode: false, isURL: true}},
    {name: "List", path: "/list", component: List, title: "List", icon: "list-ul", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: false, adminMode: false, isURL: false}},
    {name: "Subject", path: "/subjects", component: Subject, title: "Subjects", icon: "file-earmark-fill", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: true, adminMode: false, isURL: false}},
    {name: "Seller", path: "/sellers", component: Seller, title: "Sellers", icon: "graph-up", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: true, adminMode: false, isURL: false}},
    {name: "PhoneNumber", path: "/phones", component: PhoneNumber, title: "Phone Numbers", icon: "telephone-fill", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: true, adminMode: false, isURL: false}},
    {name: "Email", path: "/emails", component: Email, title: "Emails", icon: "envelope-fill", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: true,adminMode: false, isURL: false}},
    {name: "GoldenAddress", path: "/golden-addresses", component: GoldenAddress, title: "Golden Addresses", icon: "geo-alt-fill", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: true ,adminMode: false, isURL: false}},
    {name: "Properties", path: "/properties", component: Properties, title: "Properties", icon: "gear", isNavbar: true, meta: {requireAuth: true, roles:[1,2,3,4], collapse: false, adminMode: false}},
    {name: "Label", path: "/labels", component: Labels, title: "Labels", isNavbar: false, meta: {requireAuth: true, admin:[1,2], isURL: false}},
    {name: "BackgroundProcesses", path: "/background-processes", component: BackgroundProcesses, title: "Background Processes", isNavbar: false, meta: {requireAuth: true, roles:[2,1], isURL: false}},
    {name: "Error", path: "/errors", component: Error, title: "Errors", isNavbar: false, meta: {requireAuth: true, roles:[2,1], isURL: false}},
    {name: "PhoneTypes", path: "/phoneTypes", component: phoneTypes, title: "Phone Types", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "SubjectTypes", path: "/subjectTypes", component: subjectTypes, title: "Subject Types", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "CompanyTypes", path: "/companyTypes", component: companyTypes, title: "Company Types", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "ListSources", path: "/Listsources", component: sourceLists, title: "List Sources", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "SkipSourceLists", path: "/skipSourceLists", component: skipSourceLists, title: "Skip Source Lists", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "marketingChannels", path: "/marketingChannels", component: marketingChannels, title: "Marketing Channels", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "senery-error", path: "/senery-error", component: seneryError, title: "senery error", isNavbar: false, meta: {requireAuth: true, roles:[2,1]}},
    {name: "teamAdmin", path: "/teamAdmin", component: teamAdmin, title: "Team Admin", icon: "people-fill", isNavbar: false, meta: {requireAuth: true, roles:[2,1], isURL: false}},
    {name: "Plans", path: "/plans", component: plans, title: "Plans", icon: "list-ol", isNavbar: true, meta: {requireAuth: true, roles:[1], collapse: false, adminMode: true, isURL: false}},
    {name: "companyAdmin", path: "/companyAdmin", component: companyAdmin, title: "Company Admin", icon: "people-fill", isNavbar: false, meta: {requireAuth: true, roles:[2,1], isURL: false}},



]
