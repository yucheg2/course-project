import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validater";
// import API from "../../../API";
import TextAriaFiald from "../../common/form/textAriaField";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    // const [users, setUsers] = useState();
    const [error, setError] = useState({});
    const handleChange = (target) => {
        setData(p => (
            {
                ...p,
                ...target
            }
        ));
    };
    const validateConfig = {
        // userId: {
        //     isRequired: {
        //         message: "Выберите человечка"
        //     }
        // },
        content: {
            isRequired: {
                message: "Сообщение не должно быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validateConfig);
        setError(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(error).length === 0;
    // useEffect(() => {
    //     validate();
    //     API.users.fetchAll().then((data) => {
    //         setUsers(data);
    //     });
    // }, []);
    useEffect(() => {
        validate();
    }, [data]);
    // const usersArray = (users && users.map(user => {
    //     return { _id: user._id, name: user.name };
    // }));
    const clear = () => {
        setData({});
        setError({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(data);
            clear();
            validate();
        }
    };
    return (
        <div>
            <h1>New Comment</h1>
            <form onSubmit={handleSubmit} >
                {/* <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption="Выберите пользователя"
                    options={usersArray}
                    errors={error.userId}
                    name="userId"
                /> */}
                <TextAriaFiald
                    value={data.content || ""}
                    label="Сообщение"
                    name="content"
                    onChange={handleChange}
                    error={error.content}
                    placeHolder="Введите сообщение"
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" disabled={!isValid}>Отправить</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
