import { config } from 'dotenv';


config();

export const db = process.env.db || "mongodb+srv://lostAndFound:cK0AzTcTOQT3SaEQ@cluster0.sffd2px.mongodb.net/?retryWrites=true&w=majority"
export const backend_url = process.env.frontend_url || "http://localhost:5000"
export const frontend_url = process.env.backend_url || "http://localhost:3000"

export const GOOGLE_CLIENT_ID = "360421334611-8tbsqbnufgmep726qtsjh247kr8rjjjv.apps.googleusercontent.com"
export const GOOGLE_CLIENT_SECRET = "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"

export const JWT_SECRET = "LOSTANDFOUNDJWTSECRET"


export default "";