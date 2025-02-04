export interface Todo {
    id: string,
    task: string,
    status: "completed" | "pending",
    username: string,
}