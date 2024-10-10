import { ReactNode } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { JsxElement } from "typescript"

interface Props {
    children: ReactNode
}
export default function ProtectedRoutes({children} : Props) {

    if(localStorage.getItem('loggedInUser')){
        return (
            <>{children}</>
        )
    }
    else{
        return (
            <Navigate to="/login"/>
        )
    }
}
