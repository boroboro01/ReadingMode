import { createClient } from "@supabase/supabase-js";

// Supabase 프로젝트의 Settings > API에서 URL과 Anon Key를 확인하세요.
const supabaseUrl = "https://dlwdwiaxnetqhwelckrv.supabase.co";
const supabaseKey = "sb_publishable_K0HvKmiIt5D4nOmd9ZtEjg_NcJs71Q_";

export const supabase = createClient(supabaseUrl, supabaseKey);
