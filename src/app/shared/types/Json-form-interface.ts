export interface JsonFormInterface {
    controls: Control[]
}

export interface Control {
    key: string
    label?: string
    value: boolean | number | string;
    type?: string
    placeholder?: string
    validators: Validator
    step?: number
    options?: Option[]
    controlType?: string
    children?: Children[]
}

export interface Validator {
    required?: boolean
    minLength?: number
    email?: boolean
    requiredTrue?: boolean
}

export interface Option {
    value: string
    label: string
}

export interface Children {
    key: string
    type: string
    label: string
    placeholder: string
}
