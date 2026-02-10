export interface PqrsFetchList{
    idPqrs: number,
    type: string,
    status: string,
    priority: string,
    subject: string,
    description: string
    response?: string,
    idUser: number,
    assignedTo?: number,
}