import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
