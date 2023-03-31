import { useEffect, useState } from "react";
import professions from "../2. mockData/professions.json";
import qualities from "../2. mockData/qualities.json";
import users from "../2. mockData/users.json";
import httpService from "../service/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "notStarted",
        pending: "inProcess",
        successed: "ready",
        error: "errorOccured"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    const summeryCount = professions.length + qualities.length + users.length;

    function incrementCount() {
        setCount(p => p + 1);
    }
    function updateProgress() {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProggress = Math.floor((count / summeryCount) * 100);
        if (newProggress > progress) {
            setProgress(() => newProggress);
        }
        if (newProggress === 100) {
            setStatus(statusConsts.successed);
        }
    }
    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incrementCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return ({ error, initialize, status, progress });
};

export default useMockData;
