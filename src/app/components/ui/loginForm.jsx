import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validater";
import CheckBoxField from "../common/form/checkBoxField";
// import { useAuth } from "../../hooks/useAuth";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, logIn } from "../../store/users";
import history from "../../utils/history";
// import * as yup from "yup";

const LoginForm = () => {
    // const { signIn } = useAuth();
    const dispatch = useDispatch();
    const logginError = useSelector(getAuthError());

    // const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    // const [enterError, setEnterError] = useState(null);
    // console.log(process.env);//переменные окружения
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
            }
        },
        password: {
            isRequired: {
                message: "Пароль не заполнен"
            }
        }
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            ...target
        }));
        // setEnterError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // try {
        //     await signIn(data);
        //     history.push(history.location.state?.from?.pathname !== undefined
        //         ? history.location.state.from.pathname
        //         : "/"
        //     );
        // } catch (error) {
        //     setEnterError(error.message);
        // }
        const redirect = history.location?.state?.from?.pathname !== undefined
            ? history.location.state.from.pathname
            : "/";
        dispatch(logIn({ data, redirect }));
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
            {
                logginError && <p className="text-danger">{logginError}</p>
            }
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
        </form>
    );
};

export default LoginForm;
