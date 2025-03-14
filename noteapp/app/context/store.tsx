"use client"
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";


interface State {
    login:boolean
  }
interface StateContextProps{
    result:{ login: boolean; };
    setResult: Dispatch<SetStateAction<{ login: boolean; }>>;
    authorized:boolean
    setAuthorized:Dispatch<SetStateAction<boolean>>
}
async function verifyUser(setAuthorized:any){
try {
        const validUser = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`,
            {
                withCredentials:true
            }
        )
        if(validUser.data){
            console.log("user is"+validUser.data)
            setAuthorized(true)
        }else{
            setAuthorized(false);
        }
    
} catch (error) {
    console.log(error);
}}

const MyContext = createContext<StateContextProps | undefined>(undefined);

export const MyProvider:React.FC<{ children: ReactNode }> = ({children}) =>{

const [result,setResult] = useState<State>({ login:false })
const [authorized,setAuthorized] = useState(false)

    useEffect(()=>{
        verifyUser(setAuthorized);
        // console.log("rerender");
    },[result]);


    return (
        <MyContext.Provider  value={{result,setResult,authorized ,setAuthorized}}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("useMyContext must be used within a MyProvider");
    }
    return context;
  };