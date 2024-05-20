import React from "react";
import PropTypes from "prop-types";
import { Loader } from "@dtsl/react";

function AuthProvider(props) {
  const userDataLoader = true;
  const { children } = props;
  return userDataLoader ? (
    children
  ) : (
    <main className="page__content">
      <Loader isAbsolute />
    </main>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
