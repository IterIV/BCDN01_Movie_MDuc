import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminFooter from "../components/Admin/AdminFooter/AdminFooter";
import AdminHeader from "../components/Admin/AdminHeader/AdminHeader";
import AdminSidebar from "../components/Admin/AdminSidebar/AdminSidebar";

const AdminTemplate = (props) => {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <>
            {/* {localStorage.getItem("user") === null ? (
              <Redirect to="/admin/login" />
            ) : ( */}
            <>
              {/* Header */}
              <AdminHeader />

              <div className="flex overflow-hidden bg-white pt-16">
                {/* Sidebar */}
                <AdminSidebar />
                <div
                  id="main-content"
                  class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
                >
                  <main>
                    {/* Components */}
                    <props.component {...propsRoute} />
                    {/* Footer */}
                    <AdminFooter />
                  </main>
                </div>
              </div>
            </>
            {/* )} */}
          </>
        );
      }}
    />
  );
};

export default AdminTemplate;
