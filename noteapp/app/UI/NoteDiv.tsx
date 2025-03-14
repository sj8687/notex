import { ChangeEvent, useEffect, useRef, useState } from "react";

interface propsType {
    title?: string;
    description?: string;
    noteNo?: number;
    buttonText?: string;
    updateFn?: (titleVal: string, descriptionVal: string,noteNo?:number) => void;
}


export function NoteDiv({ title, description, buttonText, noteNo, updateFn }: propsType) {
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const [titleVal, setTitleVal] = useState(title ?? "");
    const [descriptionVal, setDescriptionVal] = useState(description ?? "");

    useEffect(() => {
        setTitleVal(title ?? "");
        setDescriptionVal(description ?? "");
    }, [title, description]);


    function handelTitle(event: ChangeEvent<HTMLInputElement>): void {
        setTitleVal(event.target.value)
    }
    function handelDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescriptionVal(event.target.value);
    }

    function handelSubmit() {
        titleVal && descriptionVal && updateFn ? updateFn(titleVal, descriptionVal,noteNo) : null
    }
    return (
        <div className="border md:border-none md:h-auto h-[770px]">

            <div className="mt-[100px] md:mt-0 w-[80%] mx-auto    flex flex-col  justify-center items-center">
                <label className=" font-semibold text-white">Title:</label>
                <input ref={titleRef} value={titleVal} onChange={handelTitle} className="rounded shadow-[0_0_10px_rgba(100,100,700,30)] p-1 w-[80%] outline-dashed bg-slate-200" type="text" required />
            </div>
            <div className=" w-[100%] mt-[20px] bg-black p-3 h-[auto] rounded-xl  overflow-y-hidden">
                <div className=" bg-white border rounded-xl w-[100%] pt-3 px-1 ">
                    <textarea
                        value={descriptionVal}
                        onChange={handelDescription}
                        placeholder="Type your notes here..."
                        spellCheck={false}
                        ref={descriptionRef}
                        style={{
                            width: '100%',
                            height: '400px',
                            fontSize: '16px',
                            resize: 'vertical',
                            outline: 'none',
                            paddingInline: '3px',
                            overflow: 'auto',
                            
                        }}
                    />
                </div>
                <div className=" border mt-4 bg-green-400 grid grid-cols-1 ml-[130px] md:ml-[570px] text-black t w-[90px] rounded cursor-pointer p-2">
                    <button onClick={handelSubmit}>{buttonText}</button>
                </div>

            </div>
        </div>
    )
}