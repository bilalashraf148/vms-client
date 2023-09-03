import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminDashboard } from "./pages/adminDashboard";
import { AuthProvider } from "./contextProviders/authentication";
import { AdminRoute } from "./authorization/admin";
import { UserRoute } from "./authorization/user";
import { Layout } from "./layout";
import { Add } from "./pages/product/add";
import { View } from "./pages/product/view";

export const App = () => {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path= "/signup" element={<Signup />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
            <Route path="/admin/add" element={<AdminRoute><Add/></AdminRoute>} />
            <Route path="/products/view" element={<UserRoute><View/></UserRoute>} />         
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
};
