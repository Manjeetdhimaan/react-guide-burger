import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from "./store/actions/index";
import Protected from './ProtectedRoutes/ProtectedRoutes';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncChechOut = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const AsyncContactData = asyncComponent(() => {
  return import('./containers/Checkout/ContactData/ContactData');
});

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }
 
  render() {

    // let routes = (
    //   <Routes>
    //     <Route path="/" exact element={<BurgerBuilder />} />
    //     <Route path="/auth" element={<Auth />} />
    //     {/* <Route path="*" element={<NotFound />} /> // create not found  */}
    //   </Routes>
    // );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Routes>
    //       <Route path="/" exact element={<BurgerBuilder />} />
    //       <Route path="/orders" element={this.props.isAuthenticated ? <Orders /> : <Navigate to="/auth" />} />
    //       <Route path="/logout" element={<Logout />} />
    //       <Route path="/checkout" element={<Checkout />}>
    //         <Route index={true} path="contact-data" element={<ContactData />} />
    //       </Route>
    //     </Routes>
    //   );
    // }


    return (
      <div>
        <Layout>
          <Routes>
            <Route path="/" exact element={<BurgerBuilder />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<Protected isAuthenticated={this.props.isAuthenticated}>
              <AsyncOrders />
            </Protected>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={this.props.isAuthenticated ? <AsyncChechOut /> : <Navigate to="/auth" />}>
              <Route index={true} path="contact-data" element={this.props.isAuthenticated ? <AsyncContactData /> : <Navigate to="/auth" />} />
            </Route>
            <Route path='*' render />
          </Routes>
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.checkAuthState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
