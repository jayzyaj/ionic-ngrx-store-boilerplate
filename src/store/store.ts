export interface PostState {
    posts: Array<any>,
    fetching: Boolean,
    error: Object,
    posting: Boolean
}

export interface UserState {
    users: Array<any>,
    fetching: Boolean,
    error: Object
}