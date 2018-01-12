import React from 'react';

const Layout = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </React.Fragment>
);

export default Layout;
