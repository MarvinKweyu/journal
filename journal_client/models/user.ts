// user model
export type User = {
    access: string,
    refresh: string,
    user: {
        pk: number,
        username: string,
        email: string,
        first_name: string,
        last_name: string
    }
}
