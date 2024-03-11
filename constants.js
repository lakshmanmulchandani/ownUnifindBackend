import { config } from 'dotenv';


config();

export const db = process.env.db || "mongodb+srv://lostandfound:gttExu2ExN7TrxHb@cluster0.d9sgkan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// export const backend_url = process.env.frontend_url || "http://localhost:5000"
export const backend_url = "https://ownunifindbackend.onrender.com/"
// export const frontend_url = process.env.backend_url || "http://localhost:3000"
export const frontend_url= "https://unifindnitrr.netlify.app"

export const GOOGLE_CLIENT_ID = "360421334611-8tbsqbnufgmep726qtsjh247kr8rjjjv.apps.googleusercontent.com"
export const GOOGLE_CLIENT_SECRET = "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"

export const JWT_SECRET = "LOSTANDFOUNDJWTSECRET"


export default "";