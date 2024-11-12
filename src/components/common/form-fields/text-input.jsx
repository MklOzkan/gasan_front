"use client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

const TextInput = ({
    className,
    label,
    error,
    readOnly,
    onChange,
    options,
    existingValue,
    ...rest
}) => {
    const [orderType, setOrderType] = useState('');
    if (window.location.pathname === '/dashboard/uretim/order-edit') {
        if (rest.name === 'orderType') {
            setOrderType(rest.value);
        }
    }

    return (
        <Form.Group className={className} controlId={rest.name}>
            <Form.Label>{label}</Form.Label>
            {options ? ( // Added conditional rendering based on 'options' prop
                <Form.Select
                    {...rest}
                    isInvalid={!!error}
                    readOnly={readOnly}
                    onChange={onChange || (() => {})}
                >
                    {existingValue ? (
                        <option defaultValue={existingValue}>
                            {existingValue}
                        </option>
                    ) : (
                        <option value="">Seçiniz</option>
                    )}
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}{' '}
                </Form.Select>
            ) : (
                <Form.Control
                    {...rest}
                    isInvalid={!!error}
                    readOnly={readOnly}
                    onChange={onChange || (() => {})}
                />
            )}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextInput;
