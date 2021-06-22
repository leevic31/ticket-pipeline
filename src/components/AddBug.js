import React from "react";
import { useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function AddBug({userInput, onFormChange, onFormSubmit}) {

    let history = useHistory();

    const handleChange = (event) => {
        onFormChange({
            ...userInput,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
        history.push("/bugs");
    }

    return (
    <div className="App-header">

        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control name="subject" type="text" required value={userInput.subject} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select" name="priority" value={userInput.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={userInput.status} onChange={handleChange}>
                    <option value="incomplete">Incomplete</option>
                    <option value="inprogress">In progress</option>
                    <option value="complete">Complete</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </div>  
    );
}