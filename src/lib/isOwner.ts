import { getSession } from "./get-session"

export const isOwner = async (id : string) => {

    const session = await getSession();

    return id === session?.user.id;

};