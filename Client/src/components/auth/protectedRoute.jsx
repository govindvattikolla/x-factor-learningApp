import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  }

  return <Element {...rest} />; // Render the protected element if user is authenticated
};

export default ProtectedRoute;
