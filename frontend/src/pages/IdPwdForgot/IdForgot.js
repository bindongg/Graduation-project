import React, {useContext, useState} from "react";
import {Button, Col, Container, Form, FormControl, FormGroup, InputGroup, NavLink, Row} from "react-bootstrap";
import axios from "axios";
import {customAxios} from "../../Common/Modules/CustomAxios";


//container -> 중앙으로 모아줌
function IdForgot() {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    function onChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function onChangePassword(e)
    {
        setPassword(e.target.value);
    }

    function send()
    {
        customAxios.post("/id",{email: email, password: password})
            .then((response)=>{
                if(response.data.data === null)
                {
                    alert("이메일 또는 비밀번호가 일치하지 않습니다");
                }
                else
                {
                    alert("회원님의 아이디는 "+response.data.data+"입니다");
                }
            })
    }
    return (
        <>
            <Container>
                <h3 className="text-black mt-5 p-3 text-center rounded">아이디 찾기</h3>
                <Row className="mt-5">
                    <Col lg={7} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <FormGroup className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={onChangeEmail}
                                    />
                                    <InputGroup.Text>@pusan.ac.kr</InputGroup.Text>
                                </InputGroup>
                            </FormGroup>
                            <Form.Group className="mb-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호를 입력하세요"
                                              onChange={onChangePassword}/>
                                <Form.Text className="text-muted">
                                    <NavLink href="/pwdForgot">비밀번호 찾기</NavLink>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="info" type="button" onClick={send}>
                                아이디 찾기
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default IdForgot;