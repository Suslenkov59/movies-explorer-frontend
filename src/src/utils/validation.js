const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/;
const regexName = /^[a-zA-Zа-яА-Я\sё-]+$/;

export function validateEmail(email) {
    if (email !== undefined) {
        if (email.length === 0) {
            return {invalid: true, message: 'Это поле не должно быть пустым!'};
        } else if (!regexEmail.test(email.toLowerCase())) {
            return {invalid: true, message: 'Неверный формат почты!'};
        } else if (regexEmail.test(email.toLowerCase())) {
            return {invalid: false, message: ''};
        }
    } else {
        return {invalid: true, message: ''};
    }
}

export function validateName(name) {
    if (name !== undefined) {
        if (name.length === 0) {
            return {invalid: true, message: 'Это поле не должно быть пустым!'};
        } else if (!regexName.test(name.toLowerCase())) {
            return {
                invalid: true,
                message:
                    'Имя должно содержать только латиницу, кириллицу, пробел или дефис!'
            };
        } else if (regexName.test(name.toLowerCase())) {
            return {invalid: false, message: ''};
        }
    } else {
        return {invalid: true, message: ''};
    }
}
