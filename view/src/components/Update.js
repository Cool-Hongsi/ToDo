import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class Update extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            form : {
                id : '',
                title : '',
                description : ''
            }
        }

        this.setData = this.setData.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    setData(e){
        var name = e.target.name;
        var value = e.target.value;

        this.setState({
            form:{
                ...this.state.form,
                [name]: value
            }
        });
    }

    sendData(){
        axios.put(`/api/updateData/${this.props.id}`,
        {title : this.state.form.title, description : this.state.form.description}).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        this.props.changeDesc(this.state.form.description);
    }

    render(){
        return(
            <div style={{width: "30%", margin:"auto", marginTop: "3rem", marginBottom: "3rem"}}>
                <h2>{this.props.subject}</h2><hr/>
                <Form>
                    <FormGroup>
                        <Label for="Id">ID</Label>
                        <Input type="text" name="id" placeholder="ID" value={this.props.id} onChange={this.setData} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Title">Title</Label>
                        <Input type="text" name="title" placeholder="TITLE" onChange={this.setData} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Description">Description</Label>
                        <Input type="textarea" name="description" placeholder="DESCRIPTION" onChange={this.setData} required />
                    </FormGroup>
                    <FormGroup>
                        <Button color="secondary" onClick={this.sendData}>UPDATE</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}