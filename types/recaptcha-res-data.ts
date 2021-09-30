type RecaptchaResSuccessData = {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
}

export type RecaptchaResFailData = {
    success: boolean;
    "error-codes": string[];
}

export type RecaptchaResData = RecaptchaResSuccessData | RecaptchaResFailData;

