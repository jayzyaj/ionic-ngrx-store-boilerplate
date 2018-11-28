import { AuthEffect } from './authenticate';
import { UsersEffect } from './users';
import { PostsEffect } from './posts';


export const effects: any[] = 
[PostsEffect, UsersEffect, AuthEffect]