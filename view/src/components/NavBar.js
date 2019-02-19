import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import Add from './Add';

class NavBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        isOpen: false,
        changeToggle : false
    };

    this.toggle = this.toggle.bind(this);
    this.changeURL = this.changeURL.bind(this);
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  changeURL(){
    this.setState({
      changeToggle : !this.state.changeToggle
    });

    if(this.state.changeToggle){
      this.props.history.push('/addNew');
    }
    else{
      this.props.history.push('/');
    }
    
  }

  render(){
    return(
      <div>
        <Navbar color="warning" light expand="md">
          <NavbarBrand href="/">ToDo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button color="danger" onClick={this.changeURL}>Add New</Button>
              </NavItem>
              </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/addNew" render={() => (
            <Add subject="ADD"/>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(NavBar);