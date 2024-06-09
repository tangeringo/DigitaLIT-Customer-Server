export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface StripeRequestBody {
    amount: number
}

export interface AuthRequestBody {
    name?: string | undefined;
    email: string;
    password: string
}

export interface FacebookUser {
    id: string;
    displayName: string;
}  