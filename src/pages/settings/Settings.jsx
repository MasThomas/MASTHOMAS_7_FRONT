import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ModifyUser from "../../components/modifyUser/ModifyUser";
import "./settings.css";



export default function Settings() {
    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <ModifyUser/>
            </div>
        </>
    )
}