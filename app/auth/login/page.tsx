import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Вхід | TaskManager',
  description: 'Увійдіть у свій акаунт',
}

export default function Login(){
    return(
        <div className="">
             <LoginForm/>
        </div>
    )
}