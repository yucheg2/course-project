import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType((prevState) => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-3">
                    { formType === "register"
                        ? <>
                            <h2 className="mb-2">Register</h2>
                            <RegisterForm/>
                            <p>Уже есть аккаунт?<a role="button" onClick={toggleFormType}> Войти</a></p>
                        </>
                        : <>
                            <h2 className="mb-2">Login</h2>
                            <LoginForm/>
                            <p>Нет аккаунта?<a role="button" onClick={toggleFormType}> Регистрация</a></p>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Login;
