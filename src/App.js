import React, {useEffect, useState} from 'react';
import './App.css';
import Bug from "./components/Bug";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { AiFillHome, AiFillBug } from 'react-icons/ai';
import AddBug from './components/AddBug';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


function App() {

  const initialValues = {
    subject:"",
    priority:"low",
    status:"incomplete"
  };

  const [rows, setRow] = useState([]);
  const [bugs, setBug] = useState(initialValues)

  useEffect(() => {
    fetch('/bugs').then(res => res.json()).then(data => {
      setRow(data);
    });
  }, [bugs]);

  const handleFormChange = (inputValue) => {
    setBug(inputValue)
  }

  const handleFormSubmit = () => {
    fetch('/add-bug', {
      method: 'POST',
      body: JSON.stringify({
        content:bugs,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(data => setBug(data))
       . then(message => console.log(message))
  }

  return (
    <div className="App-header">
    <Router>
    <Route path='/add-bug'>
      <AddBug userInput={bugs} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
    </Route>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="">
                    <NavItem eventKey="">
                        <NavIcon>
                          <AiFillHome style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="bugs">
                        <NavIcon>
                          <AiFillBug style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Bugs
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/" exact component={props => <Home />} />
                <Route path="/bugs" component={props => <Bug rows={rows} setRow={setRow} setBug={setBug}/>} />

            </main>
        </React.Fragment>
    )}
    />
</Router>
</div>
  );
}

export default App;

