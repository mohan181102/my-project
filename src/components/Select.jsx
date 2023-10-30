import React, { useId } from "react";


function Select({
    label,
    className='',
    options=[],
    ...prop
},ref){
    const id = useId()
    return (

        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select {...prop} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-150 border border-gray-100 w-full ${className}`}>
                {options?.map((option)=>(
                    <options key={option}>
                        {option}
                    </options>
                ))}
            </select>
        </div>
    )

}


export default React.forwardRef(Select)