import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import "bootstrap/dist/css/bootstrap.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";

export default function Dashboard() {
    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = localStorage.getItem("todoList");
        if (storedTasks) {
            setList(JSON.parse(storedTasks));
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (list.length > 0) {
            localStorage.setItem("todoList", JSON.stringify(list));
        }
    }, [list]);

    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const addItem = () => {
        if (userInput.trim() !== "") {
            const newItem = { id: Date.now(), value: userInput };
            const updatedList = [...list, newItem];
            setList(updatedList);
            localStorage.setItem("todoList", JSON.stringify(updatedList));
            setUserInput("");
        }
    };

    const deleteItem = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
        localStorage.setItem("todoList", JSON.stringify(updatedList));
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <h1 className="text-center">TODO LIST</h1>
            </Row>

            <Row className="justify-content-center mt-3">
                <Button variant="danger" onClick={logout} className="w-auto px-4">Logout</Button>
            </Row>
            <br></br>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Add item..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <Button variant="dark" onClick={addItem}>ADD</Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <ListGroup>
                        {list.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                                {item.value}
                                <Button variant="light" onClick={() => deleteItem(item.id)}>Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}
