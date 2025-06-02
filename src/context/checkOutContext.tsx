
import { createContext, useState } from "react";
import React from 'react'

interface Props {
    children:React.ReactNode;
}

interface ContextProps{
    active:boolean,
    modal:boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataList:any;
    setDataList:React.Dispatch<React.SetStateAction<object>>
    setModal:React.Dispatch<React.SetStateAction<boolean>>;
    dataListId:string;
    setDataListId :React.Dispatch<React.SetStateAction<string>>;
    setCheckList:React.Dispatch<React.SetStateAction<object>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkList:any;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CheckOutContext = createContext<ContextProps>({
    active:false,
    setActive:()=>{},
    modal:false,
    dataList:{},
    setDataList:() => {},
    setModal:() => {},
    dataListId:"",
    setDataListId:()=>{},
    setCheckList:() => {},
    checkList:{}
})


const CheckOutProvider = ({children}:Props) => {


        
        const [active,setActive] = useState(false)
        const [modal,setModal] = useState(false)
        const [dataList,setDataList] = useState({})
        const [dataListId,setDataListId] = useState<string>("")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const [checkList,setCheckList] = useState<any>({})



        const data = {active,modal,setActive,setDataList,dataList,setModal,setDataListId,dataListId,setCheckList,checkList}
        return (
            <CheckOutContext.Provider value={data}>
                {children}
            </CheckOutContext.Provider>
        )
}

export default CheckOutProvider;