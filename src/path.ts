
export const ABOUT = "/about";
export const POSTS = "/posts";

// dynamic routes Path constant 

type props = number | string;

export const SINGLE_POST = (id : props) => `${POSTS}/${id}`
export const UPDATE_POST = ( id : props) => `${POSTS}/${id}/edit`

export const registerPath = "/auth/register";
export const loginPath = "/auth/log-in";
export const logoutPath = "/auth/log-out";

export const resetPasswordPath = "/auth/reset-password"
export const changePasswordPath = "/auth/change-password"