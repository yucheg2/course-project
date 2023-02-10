export function validator(data, config) {
    const errors = {};
    function validate(validateMetchod, data, config) {
        let statusValidate;
        switch (validateMetchod) {
        case "isRequired":
            statusValidate = data.trim() === "";
            break;
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "isCapital": {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "isContainDigit": {
            const digitRehExp = /\d+/g;
            statusValidate = !digitRehExp.test(data);
            break;
        }
        case "min": {
            statusValidate = data.trim().length < config.value;
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMetchod in config[fieldName]) {
            const error = validate(
                validateMetchod,
                data[fieldName],
                config[fieldName][validateMetchod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            };
        }
    }
    return errors;
}
