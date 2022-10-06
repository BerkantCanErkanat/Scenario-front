import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";

export function Navi() {
  return (
    <div>
      <Navbar color="warning" className="my-1">
        <NavbarBrand href="/">Scenarios</NavbarBrand>
          <NavItem tag="h6">
            <Link to="/addNewScenario">new scenario</Link>
          </NavItem>
          <NavItem tag="h6">
            <Link to="/">Back</Link>
          </NavItem>
      </Navbar>
    </div>
  );
}
