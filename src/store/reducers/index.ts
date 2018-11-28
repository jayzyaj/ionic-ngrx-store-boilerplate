import { postsReducer } from "../reducers/posts";
import { usersReducer } from "./users";
import { authReducer } from "./authenticate";
import { resetStateReducer } from "./resetState";

export const rootReducer = {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
    // clearState: resetStateReducer
}