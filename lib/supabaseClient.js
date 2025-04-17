import { createClient } from "@supabase/supabase-js";
const env = require('dotenv')

// const {NODE_ENV} = process.env
env.config({ path: `.env.local` })


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
// console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


export const supabase = createClient(supabaseUrl, supabaseAnonKey)