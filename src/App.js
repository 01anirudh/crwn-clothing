import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/hompage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-Up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview} from "./redux/shop/shop.selector";
import { checkUserSession } from './redux/user/user.action';

class App extends React.Component {
  // unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();

  }
  // componentWillUnmount() {
  //   // this.unsubscribeFromAuth();
  // }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArrays: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () =>dispatch(checkUserSession())
})



export default connect(
  mapStateToProps,mapDispatchToProps)(App);