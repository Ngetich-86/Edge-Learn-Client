export interface TUser {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image_url: string;
    password: string;
    isVerified: boolean;
}

export interface Blog {
    blog_id: number;
    blog_name: string;
    blog_description: string;
    blog_link: string;
    blog_image: string;
}

export interface BlogState {
    blog: Blog[];
    selectedBlog: Blog | null;
}

export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string,
    user_type:string;
    image_url: string;
}

export interface UserState {
    token: string | null;
    user: User | null;
}