import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';



class App extends React.Component {

  unsubscriberFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscriberFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        });

      }
      else {
        setCurrentUser(userAuth);
      }
    }

    );
  }
  componentWillUnmount() {
    this.unsubscriberFromAuth();

  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact
            path='/signIn'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (

                  <SignInAndSignUpPage />
                )
            } />
        </Switch>
      </div>
    );
  }
}
const maoStateToProps = ({ user }) => ({
  currentUser: user,
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(maoStateToProps, mapDispatchToProps)(App);
