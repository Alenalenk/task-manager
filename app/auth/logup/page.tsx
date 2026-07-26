import LogupForm from "@/features/auth/components/LogupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Вхід | TaskManager',
  description: 'Увійдіть у свій акаунт',
}

export default function Logup(){
    return(
        <div className="">
             <LogupForm/>
        </div>
    )
}