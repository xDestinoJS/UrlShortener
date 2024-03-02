import { useState } from "react"

export default function input({ text, onInput, value, disabled }) {
    const handleChange = (event) => {
        onInput(event.target.value);
    };

    return (
        <>
            <div className="input_container">
                <p>{text}</p>
                <input type="text" id="barcode" onChange={handleChange} value={value} disabled={disabled}></input>
            </div>
        </>
    )
}