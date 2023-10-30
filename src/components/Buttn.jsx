import React from "react";


function Button({
    children,
    type='button',
    bgcolor = 'bg-blue-400',
    className='',
    ...props
}){
    return(
        <button className={`px-4 py-2 rounded-lg ${type} ${className} ${bgcolor}`}>
            {children}
        </button>
    )
}


export default Button