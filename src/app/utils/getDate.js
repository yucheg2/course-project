const getDate = (ms) => {
    const data = new Date(parseInt(ms));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - data.getFullYear();
    if (yearDif > 0) {
        return " - " + data.getDate() + "." + (data.getMonth() + 1) + "." + data.getFullYear();
    }
    const dayDif = dateNow.getDay() - data.getDay();
    if (dayDif > 0) {
        return " - " + data.getDate() + "." + (data.getMonth() + 1);
    }
    const hourDif = dateNow.getHours() - data.getHours();
    if (hourDif > 0) {
        return " - " + data.getHours() + ":" + (data.getMinutes());
    }
    const minutDif = dateNow.getMinutes() - data.getMinutes();
    if (minutDif > 30) {
        return "30 минут назад";
    }
    if (minutDif < 30 && minutDif >= 10) { return " 10 минут назад"; }
    if (minutDif < 10 && minutDif >= 5) { return " 5 минут назад"; }
    if (minutDif < 5 && minutDif >= 0) { return " 1 минуту назад"; }
};

export default getDate;
