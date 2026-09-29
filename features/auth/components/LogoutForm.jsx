import { useActionState } from "react";
import { logoutAction } from "../actions/logout.action";
import { Button } from "flowbite-react";
import { redirect } from "next/navigation";
import { useGlobalActionError } from "@/app/shares/hooks/useGlobalActionError";

const initialState = {
    success: false,
    message: "",
};

export const LogoutForm = () => {
    const [state, formAction, pending] = useActionState(
        logoutAction,
        initialState
    );

    useGlobalActionError(state.error)

    if (state.success) {
        redirect('/auth/login');
    }

    return (
        <form action={formAction}>
            <Button size="xs" color="primary" type="submit" disabled={pending}>
                Вийти
            </Button>
        </form>
    )
}