
export const ABOUT = "/about";
export const POSTS = "/posts";

// dynamic routes Path constant 

type props = number | string;

export const SINGLE_POST = (id : props) => `${POSTS}/${id}`