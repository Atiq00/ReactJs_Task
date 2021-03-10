import React from 'react'
export const InputString = (props) => {
    return (
        <>
            <input type="text" className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" value={props.value} onChange={props.handleChange}/>
        </>
    )
}

export default InputString;
