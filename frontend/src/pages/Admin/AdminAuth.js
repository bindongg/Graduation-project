import {Button, Col, Container, Form, NavLink, Row} from "react-bootstrap";
import React, {useContext, useState} from "react";
import axios from "axios";
import {Token} from "../../Context/Token/Token";
import {Logout} from "../../Common/Modules/Common";
import {useNavigate} from "react-router-dom";
import { IP } from "../../Context/IP";

function AdminAuth() {
    const navigate = useNavigate();

    const {token,setToken} = useContext(Token);
    const ip = useContext(IP);

    const [id,setId] = useState("");

    const [role,setRole] = useState("ROLE_USER");

    function onChangeId(e)
    {
        setId(e.target.value);
    }

    function onChangeRole(e)
    {
        setRole(e.target.value);
    }

    function send()
    {
        axios.post(`http://${ip}:8080/admin/auth`,{id: id, role: role}, {headers: {authorization: token}})
            .then(
                (response)=>
                {
                    if(response.data.code === 200)
                    {
                        alert("권한 변경 완료");
                    }
                    else
                    {
                        alert("failed");
                    }
                }
            )
            .catch((error)=>
            {
                if(error.response.status === 401)
                {
                    Logout(token, setToken, navigate);
                }
            })
    }

    return(
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">권한 수정</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control placeholder="권한을 수정할 유저 아이디" onChange={onChangeId}/>
                            </Form.Group>
                            <Form.Select size="sm" defaultValue="ROLE_USER" onChange={onChangeRole}>
                                <option>ROLE_USER</option>
                                <option>ROLE_MANAGER</option>
                            </Form.Select>
                            <br/>
                            <Button variant="info" type="button" onClick={send}>
                                완료
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default AdminAuth;