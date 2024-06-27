export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface StripeRequestBody {
    amount: number
}

export interface AuthRequestBody {
    name: string;
    email: string;
    password: string
}

export interface FacebookUser {
    id: string;
    displayName: string;
}  

export interface databaseUser {
    createdAt: Date;
    displayName: string;
    email: string;
    password: string;
    providerId?: string | undefined;
}