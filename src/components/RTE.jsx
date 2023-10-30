import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";



function RTE({name, control, label, defaultvalue=''}){
    return (
        <>
            <div className={`w-full`}>
                {label && <label className={`inline-block mb-1 pl-1`}>{label}</label>}

                <Controller
                name={name||'content'}
                control={control}
                render={({field:{onChange}})=>(
                    <Editor
                    initialValue={defaultvalue}
                    init={{
                        height:500,
                        menubar:true,
                        plugins:['autolink list link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen'],
                    toolbar:'undu redu'

                    }}
                    onEditorChange={onChange}
                    />
                )}
                />
            </div>

        </>
    )
}

export default RTE