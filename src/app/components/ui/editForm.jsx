import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validater";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFild";
import MultiSelectField from "../common/form/multiSelectField";
import API from "../../API";
import { useHistory } from "react-router-dom";

const EditForm = ({ userData, qualities, professions }) => {
    const { push } = useHistory();
    const [data, setData] = useState({
        name: userData.name,
        email: userData.email,
        profession: userData.profession._id,
        sex: userData.sex,
        qualities: userData.qualities.map((qualitie) => {
            return { label: qualitie.name, value: qualitie._id };
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

    const getProfessionById = (profession) => {
        const professionArray = !Array.isArray(professions) && typeof (professions) === "object"
            ? Object.values(professions)
            : professions;
        return professionArray.find((p) => {
            return p._id === profession;
        });
    };

    const getQualities = (qual) => {
        const qualitiesArray = !Array.isArray(qualities) && typeof (qualities) === "object"
            ? Object.values(qualities)
            : qualities;
        return qualitiesArray.filter((q) => {
            return qual.some((qual) => {
                return q._id === qual.value;
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            ...data,
            qualities: getQualities(data.qualities),
            profession: getProfessionById(data.profession)
        };
        const isValid = validate();
        if (isValid) {
            API.users.update(userData._id, newData);
            push("/users/" + userData._id);
        }
    };
    return (
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
                defaultOption={userData.profession.name}
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
