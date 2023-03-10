import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validater";
import TextField from "../common/form/textField";
import api from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFild";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

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
        },
        profession: {
            isRequired: {
                message: "Профессия не выбрана"
            }
        },
        licence: {
            isRequired: {
                message: "Согласися пжп"
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
            <SelectField
                label="Выберите профессию"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Choose..."
                options={professions}
                error= {errors.profession}
            />
            <RadioField
                options={[{ value: "male", name: "Мужчина" }, { value: "fimale", name: "Женщина" }]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
                label="Выберите пол"
            />
            <MultiSelectField
                name="qualities"
                options={qualities}
                defaultValue={data.qualities}
                onChange={handleChange}
                label="Выберите ваши качества"
            />
            <CheckBoxField
                name='licence'
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                <a>Подтвердите лицензионное соглашение</a>
            </CheckBoxField>
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
        </form>
    );
};

export default RegisterForm;
