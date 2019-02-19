import React from 'react';
import '../css/Todo.css';
import { Alert, Container, Row, Col, Button } from 'reactstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import Update from './Update';
import axios from 'axios';

class Todo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data : [],
            unchangedData : [],
            intervalIsSet : null,
            id : '',
            title : '',
            description : ''
        }

        this.getData = this.getData.bind(this);
        this.description = this.description.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.searchBar = this.searchBar.bind(this);
    }

    componentDidMount(){
        this.getData();
        if(!this.state.intervalIsSet) {
            let interval = setInterval(this.getData, 1000);
            this.setState({
                intervalIsSet: interval
            });
        }
    }

    componentWillUnmount() {
        if(this.state.intervalIsSet){
            clearInterval(this.state.intervalIsSet);
            this.setState({
                intervalIsSet: null
            });
        }
    }

    getData(){
        fetch('/api/getData').then((res) => {
            res.json().then((result) => {
                this.setState({
                    data : result,
                    unchangedData : result
                })
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    searchBar(e){
        var newData = this.state.unchangedData.filter((el) => {
            return el.title.toLowerCase().includes(e.target.value);
        });

        this.setState({
            data : newData
        });
    }

    description(desc){
        document.querySelector(".desc").innerHTML = desc;
    }

    update(data){
        this.setState({
            id : data.id,
            title : data.title,
            description : data.description
        });

        this.props.history.push('/update');
    }

    delete(data){
        axios.delete(`/api/deleteData/${data.id}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <div>
                    <Switch>
                        <Route exact path="/update" render={() => (
                            <Update subject="UPDATE" id={this.state.id} changeDesc={this.description}/>
                            // <Update subject="UPDATE" id={this.state.id} title={this.state.title} description={this.state.description} />
                        )}/>
                    </Switch>
                </div>
                <div className="search">
                    <input type="text" onChange={this.searchBar} placeholder="Search Title" />
                </div>
                <div className="todoList">
                    <div className="left">
                        <Container>
                            <Row>
                                {this.state.data.map((el) => {
                                    return(
                                        <Col xl="6" lg="6" md="12" sm="12" xs="12">
                                            <Alert color="primary">
                                                <p>ID : {el.id}</p>
                                                <p>Title : {el.title}</p>
                                                <div className="btn-category">
                                                    <Button color="success" className="btn" onClick={() => this.description(el.description)}><i class="fas fa-plus"></i></Button>
                                                    <Button color="warning" className="btn" onClick={() => this.update(el)}><i class="fas fa-pen"></i></Button>
                                                    <Button color="danger" className="btn" onClick={() => this.delete(el)}><i class="fas fa-trash-alt"></i></Button>
                                                </div>
                                            </Alert>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                    </div>
                    <div className="right">
                        <h2>Description</h2><hr/>
                        <p className="desc">
                                
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Todo);