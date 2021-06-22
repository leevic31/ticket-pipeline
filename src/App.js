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
  const [addBug, setAddBug] = useState(initialValues)

  useEffect(() => {
    fetch('/bugs').then(res => res.json()).then(data => {
      setRow(data);
    });
  }, []);

  const handleFormChange = (inputValue) => {
    setAddBug(inputValue)
  }

  const handleFormSubmit = () => {
    fetch('/add-bug', {
      method: 'POST',
      body: JSON.stringify({
        content:addBug,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
       . then(message => console.log(message))

    fetch('/bugs').then(res => res.json()).then(data => {
      setRow(data);
    });
  }

  return (
    <div className="App-header">
    <Router>
    <Route path='/add-bug'>
      <AddBug userInput={addBug} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
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
                <Route path="/bugs" component={props => <Bug rows={rows} setRow={setRow}/>} />
            </main>
        </React.Fragment>
    )}
    />
</Router>
</div>
  );
}

export default App;

