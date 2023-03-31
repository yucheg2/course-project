import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, status, progress } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container mt-4">
            <h1>Main Page</h1>
            <h3>Инициализация данных в firebase</h3>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}</li>
                {error && <li>{error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
