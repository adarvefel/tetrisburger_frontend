export interface CreatePqrsDto{
    type: string,
    subject: string,
    description: string
}

export interface PqrsFetchListMe{
    idPqrs: number,
    type: string,
    status: string,
    priority: string,
    subject: string,
    description: string
    response?: string,
    idUser: number
    assignedTo: number
}

export interface UpdatePqrsUserRequestDto{
    type?: string,
    subject?: string,
    description?: string
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