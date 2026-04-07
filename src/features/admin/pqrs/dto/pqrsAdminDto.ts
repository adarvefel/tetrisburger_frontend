export interface PqrsFetchList {
    idPqrs: number,
    type: string,
    status: string,
    priority: string,
    subject: string,
    description: string
    response?: string,
    idUser: number,
    assignedTo?: number,
    createdAt: string;
    updatedAt: string;
    createdBy: number,
    updatedBy: number
}

export interface PqrsFindByIdResponse {
    idPqrs: number;
    type: string;
    status: string;
    priority: string;
    subject: string;
    description: string;
    response?: string;
    idUser: number;
    assignedTo?: number;
}