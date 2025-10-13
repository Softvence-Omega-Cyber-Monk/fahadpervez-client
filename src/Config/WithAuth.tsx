import { useGetMeQuery } from "@/Redux/Features/auth/auth.api"
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IWithAuthProps {
    children: ReactNode,
    requiredRole?: string
}

const WithAuth = ({ children, requiredRole }: IWithAuthProps) => {
    const { data, isLoading } = useGetMeQuery(null);

    if (!isLoading && !data?.data?.email) {
        return <Navigate to={"/login"} />
    };

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
        return <Navigate to={"/un-authoraised"} />
    };

    return children
};

export default WithAuth