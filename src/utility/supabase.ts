import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.supabase";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_SECRET as string
);

export { supabase };
