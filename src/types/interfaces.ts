export interface AuthCredentials {
    id?: string | undefined;
    accessToken: string;
    refreshToken: string;
}

export type StripeRequestBody = AuthCredentials & { amount: number }

export type ResetPasswordRequestBody = AuthCredentials & { newPassword: string }

export interface AuthRequestBody {
    displayName: string;
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