export const updateObject = (oldObject, updateValues) => {
    return {
        ...oldObject,
        ...updateValues
    }
}

export const checkFormValidity = (value, validators) => {
    let isValid = true;
    if (!validators) {
        return true;
    }

    if (validators) {
        if (validators.required) {
            isValid = (value.trim() !== '') && isValid;
        }

        if (validators.minLength) {
            isValid = value.trim().length >= validators.minLength && isValid;
        }

        if (validators.maxLength) {
            isValid = value.trim().length <= validators.maxLength && isValid;
        }

        if (validators.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (validators.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

    }
    return isValid;
}