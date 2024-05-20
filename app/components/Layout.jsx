import PropTypes from "prop-types";
import React from "react";
import SvgGraphics from "../svgGraphics";
function Layout(props) {
  const { children } = props;

  return (
    <div>
      <nav
        className="header"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <a href="/" className="topnav__control header__organization" rel="home">
          <span className="topnav__label">
            <SvgGraphics iconType="sendinblueLogo" />
          </span>
        </a>
      </nav>
      <div className="page__strut">
        <main className="page__content">{children}</main>
      </div>
    </div>
  );
}

Layout.defaultProps = {
  header: false,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
};

export default Layout;
