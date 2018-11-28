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

export interface AuthState {
    isAuthenticated: Boolean,
    authenticating: Boolean,
    error: Object,
    token: String
}