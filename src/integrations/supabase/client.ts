// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://stmrztkvwpnsqqeuwxll.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bXJ6dGt2d3Buc3FxZXV3eGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTM5MTMsImV4cCI6MjA2MDU4OTkxM30.H3vWT09te0JMjdK3sNwGr9a5s3SPmtmrFM0pJxxlvU8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);