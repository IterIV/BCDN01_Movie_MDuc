import React from "react";
import { Route } from "react-router-dom";
import HomeHeader from "../components/Home/HomeHeader/HomeHeader";
import HomeFooter from "../components/Home/HomeFooter/HomeFooter";

const HomeTemplate = (props) => {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <>
            {/* Header */}
            <HomeHeader {...propsRoute} />
            {/* Components */}
            <props.component {...propsRoute} />
            {/* Footer */}
            <HomeFooter />
          </>
        );
      }}
    />
  );
};

export default HomeTemplate;
