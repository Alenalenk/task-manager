import LogupForm from "@/features/auth/components/LogupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Реєстрація | TaskManager',
  description: 'Створіть обліковий запис',
}

export default function Logup(){
    return(
        <div className="">
             <LogupForm/>
        </div>
    )
}