import { useAppSelector } from "@/hooks/useRedux";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IWithAuthProps {
    children: ReactNode,
    requiredRole?: string
}

const WithAuth = ({ children, requiredRole }: IWithAuthProps) => {
    const role = useAppSelector(state => state?.auth?.user?.role)
    if (!role) {
        return <Navigate to={"/login"} />
    };

    if (requiredRole && requiredRole !== role) {
        return <Navigate to={"/un-authoraised"} />
    };
    return children
};

export default WithAuth