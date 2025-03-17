import { MouseEventHandler } from "react";

interface ButtonType{
    text?:string;
    onClick?:MouseEventHandler;
    width?:string;
    height?:string;
    textSize?:string;
    textColor?:string;
    
}

export function CustomeButton({text,onClick,width,height,textSize,textColor}:ButtonType){
    
    return <button onClick={onClick} className={`bg-green-400  shadow-[0_0_10px_rgba(250,000,100,30)] border p-1 px-4 rounded-lg ${textColor} transition-shadow duration-100 hover:shadow-blue ${textSize} ${width} ${height} `}>{text}</button>
}