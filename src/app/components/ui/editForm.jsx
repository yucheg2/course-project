import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validater";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFild";
import MultiSelectField from "../common/form/multiSelectField";
// import { useHistory } from "react-router-dom";
// import { useProfessons } from "../../hooks/useProfessions";
// import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";
import { editUser } from "../../store/users";

const EditForm = ({ userData, qualities, professions }) => {
    // const { push } = useHistory();
    // const { editUser } = useAuth();
    const dispatch = useDispatch();
    // const { getProfessionById } = useProfessons();
    // const defaultProf = getProfessionById(userData.profession);
    const defaultProf = useSelector(getProfessionById(userData.profession));
    const [data, setData] = useState({
        ...userData,
        qualities: userData.qualities.map((qualitie) => {
            const qualItem = qualities.find(q => q._id === qualitie);
            return { label: qualItem.name, value: qualItem._id };
        })
    });
    const [errors, setErrors] = useState({});
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
        name: {
            isRequired: {
                message: "Имя должно быть заполненым"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта не заполнена"
            },
            isEmail: {
                message: "Email введен не правильно :("
            }
        },
        profession: {
            isRequired: {
                message: "Профессия не выбрана"
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
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        };
        const isValid = validate();
        if (isValid) {
            dispatch(editUser(newData));
        }
    };
    return (
        userData &&
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label="Выберите профессию"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                defaultOption={defaultProf.name}
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
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
        </form>
    );
};

EditForm.propTypes = {
    userData: PropTypes.object,
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default EditForm;
