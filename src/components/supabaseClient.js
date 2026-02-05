import { createClient } from '@supabase/supabase-js'

// Thay thế bằng URL và Key của BẠN
const supabaseUrl = 'https://crcnmohxiejkulgfkxxr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyY25tb2h4aWVqa3VsZ2ZreHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTgzOTEsImV4cCI6MjA3NTMzNDM5MX0.N7zxVgFjozLBrVj4gZsHx08hEAXWsoBmPokVcCf7aLo'

export const supabase = createClient(supabaseUrl, supabaseKey)