import { useActionState } from "react";
import { logoutAction } from "../actions/logout.action";
import { Button } from "flowbite-react";

const initialState = {
    success: false,
    message: "",
};

export const LogoutForm = () => {
    const [state, formAction, pending] = useActionState(
        logoutAction,
        initialState
    );
    return (
        <form action={formAction}>
            <Button size="xs" color="secondary" type="submit" disabled={pending}>
                Вийти
            </Button>
        </form>
    )
}