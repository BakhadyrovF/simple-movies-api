



export default class Validator {
    ruleMessages = {
        required: ':field is required',
        string: ':field field must be of type string',
        number: ':field field must be of type number',
        boolean: ':field field must be of type boolean',
        array: ':field field must be of type array',
        date: ':field field must be date',
        min: ':field field min/min-length is :min',
        max: ':field field max/max-length is :max',
        size: ':field field size must be :size'
    }

    static make(data, rules) {
        const validator = new Validator();
        validator.data = data;
        validator.rules = rules;
        validator.messages = {};

        return validator;
    }

    validate() {
        let ruleArg = null;
        outer: for (let [field, rules] of Object.entries(this.rules)) {
            if (rules.includes('nullable') && this.input(field) === null) {
                continue outer;
            }

            for (let rule of rules) {
                if (this.messages[field] && this.messages[field].length !== 0) {
                    continue outer;
                }

                rule = rule.at(0).toUpperCase() + rule.slice(1);
                [rule, ruleArg] = rule.split(':');

                if (!this[`_validate${rule}`](field, ruleArg)) {
                    rule = rule.toLowerCase();
                    if ((field in this.messages)) {
                        this.messages[field].push(this.getRuleMessage(rule, field, ruleArg));
                    } else {
                        this.messages[field] = [this.getRuleMessage(rule, field, ruleArg)];
                    }
                }
            }
        }

        return Object.keys(this.messages).length === 0;
    }

    input(field) {
        return this.data[field];
    }

    getMessages() {
        return this.messages
    }

    getRuleMessage(rule, field, ruleArg) {
        return this.ruleMessages[rule].replace(':field', field).replace(`:${rule}`, ruleArg);
    }

    _validateRequired(field) {
        return field in this.data;
    }

    _validateNullable() {
        return true;
    }

    _validateBoolean(field) {
        return typeof this.input(field) === 'boolean';
    }

    _validateString(field) {
        return typeof this.input(field) === 'string';
    }

    _validateNumber(field) {
        return typeof this.input(field) === 'number';
    }

    _validateArray(field) {
        return typeof Array.isArray(this.input(field));
    }

    _validateDate(field) {
        try {
            return new Date(this.input(field));
        } catch (exception) {
            return false;
        }
    }

    _validateMin(field, min) {
        if (typeof this.input(field) === 'number') {
            return this.input(field) >= min;
        }
        return this.input(field)?.length >= min;
    }

    _validateMax(field, max) {
        if (typeof this.input(field) === 'number') {
            return this.input(field) <= max;
        }

        return this.input(field)?.length <= max;
    }

    _validateSize(field, size) {
        if (typeof this.input(field) === 'number') {
            return this.input(field) === Number(size);
        }

        return this.input(field)?.length === Number(size);
    }

    _isNullable(rules) {
        rules.find((rule) => rule === 'nullable');
    }
}