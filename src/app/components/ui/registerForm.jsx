import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validater";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFild";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessons } from "../../hooks/useProfessions";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const { push } = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        name: "",
        sex: "Male",
        qualities: [],
        licence: false
    });
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});
    const { professions } = useProfessons();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((q) => (
        { label: q.name, value: q._id }
    ));
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
        name: {
            isRequired: {
                message: "Имя не заполнено"
            },
            min: {
                message: "Имя должно содержать минимум 3 символа",
                value: 3
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            push("/");
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
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
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
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
                options={qualitiesList}
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
