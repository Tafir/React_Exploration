import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

class App extends React.Component {
  constructor(){
    super();

    this.state = { 
      currentUser: null
    };
  }

  unsubsribeFromAuth = null;

  componentDidMount(){
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      this.setState({currentUser: userAuth});
  
    });
  }

  componentWillUnmount(){
    this.unsubsribeFromAuth();
  }

  render(){
    return(
      <div className="App">
        <BrowserRouter>
        <Header currentUser = {this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/shop/hats' component={HatsPage} />
            <Route exact path='/signin' component={SignInAndSignUpPage} />
          </Switch>
        </BrowserRouter>
      </div>
  );
  }
}

export default App;
