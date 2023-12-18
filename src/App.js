import { CssBaseline, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./contextProviders/authentication";
import { AdminRoute } from "./authorization/admin";
import { Layout } from "./layout";
import { VehicleTable } from "./pages/list/vehicles";

export const App = () => {
  return (
    <Box>
      <CssBaseline />
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path= "/signup" element={<Signup />} />
            <Route path="/admin/vehicles" element={<AdminRoute><VehicleTable/></AdminRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Box>
  );
};
