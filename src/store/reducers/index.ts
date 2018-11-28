import { postsReducer } from "../reducers/posts";
import { usersReducer } from "./users";
import { authReducer } from "./authenticate";

export const rootReducer = {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
}