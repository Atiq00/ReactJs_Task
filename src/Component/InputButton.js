import React from 'react'
export const InputButton = (props) => {
    return (
        <>
            <button type="button" className="inline-block pt-1 pb-1 pl-5 pr-5 bg-gray-500 hover:bg-green-500" onClick={props.handleOK}>submit</button>
        </>
    )
}

export default InputButton;
