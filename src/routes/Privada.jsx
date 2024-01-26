import auth from "./auth";
import { Navigate } from "react-router-dom";

export const Privada = ({ children }) => {
  if(!auth.isAuthenticated()) {
    return <Navigate to="/" />
  }

  return children
}