export default function generateAuthError(message) {
    switch (message) {
    case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND" :
        return "Email или пароль введены неверно";
    case "EMAIL_EXISTS":
        return "Пользователь с таким email уже зарегистрирован";
    default:
        return "Слишком много попыток входа";
    }
}
