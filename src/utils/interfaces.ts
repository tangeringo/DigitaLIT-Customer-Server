export interface StripeRequestBody {
    amount: number
}

export interface AuthRequestBody {
    name?: string | undefined;
    email: string;
    password: string
}