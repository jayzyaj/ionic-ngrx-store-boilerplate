import { postsReducer } from "../reducers/posts";
import { usersReducer } from "./users";

export const rootReducer = {
    posts: postsReducer,
    users: usersReducer
}