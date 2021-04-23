import Home from "../pages/home"
import Import from "../pages/import"
import List from "../pages/list"
import Subject from "../pages/subject"
import Seller from "../pages/seller"
import PhoneNumber from "../pages/phoneNumber"
import Email from "../pages/email"
import GoldenAddress from "../pages/goldenAddress"
import Properties from "../pages/properties"

export const routes = [
    {
        name: "HomePage",
        path: "/",
        component: Home,
        title: "Home",
        icon: "house-fill"
    },
    {
        name: "ImportPage",
        path: "/import",
        component: Import,
        title: "Import",
        icon: "upload"
    },
    {
        name: "ListPage",
        path: "/list",
        component: List,
        title: "List",
        icon: "list-ul"
    },
    {
        name: "SubjectPage",
        path: "/subject",
        component: Subject,
        title: "Subject",
        icon: "file-earmark-fill"
    },
    {
        name: "Seller",
        path: "/seller",
        component: Seller,
        title: "Seller",
        icon: "graph-up"
    },
    {
        name: "PhoneNumberPage",
        path: "/phone-number",
        component: PhoneNumber,
        title: "Phone Number",
        icon: "telephone-fill"
    },
    {
        name: "EmailPage",
        path: "/email-address",
        component: Email,
        title: "Email",
        icon: "envelope-fill"
    },
    {
        name: "GoldenAddressPage",
        path: "/golden-address",
        component: GoldenAddress,
        title: "Golden Address",
        icon: "geo-alt-fill"
    },
    {
        name: "PropertiesPage",
        path: "/properties",
        component: Properties,
        title: "Properties",
        icon: "gear"
    }
]