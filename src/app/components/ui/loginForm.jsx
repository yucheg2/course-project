import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validater";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateScheme.validate(data).then(() => setErrors({})).catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    // const validateScheme = yup.object().shape({
    //     password: yup.string().required("Пароль не заполнен").matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одну цыфру")
    //         .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один из специальных символов (!@#$%^&*)")
    //         .matches(/(?=.{8,})/, "Пароль должен содержать минимум 8 символов"),
    //     email: yup.string().required("Электронная почта не заполнена").email("Email введен не правильно :(")
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта не заполнена"
            },
            isEmail: {
                message: "Email введен не правильно :("
            }
        },
        password: {
            isRequired: {
                message: "Пароль не заполнен"
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цыфру"
            },
            min: {
                message: "Пароль должен содержать минимум 8 символов",
                value: 8
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            ...target
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name='stayOn'
                value={data.stayOn}
                onChange={handleChange}
            >
                Остаться в системе
            </CheckBoxField>
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
        </form>
    );
};

export default LoginForm;
