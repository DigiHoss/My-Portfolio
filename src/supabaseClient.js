import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohpmhddlvxheemzycigq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocG1oZGRsdnhoZWVtenljaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NzkyOTUsImV4cCI6MjA2MzA1NTI5NX0.tzmnKA2YdgX9Psi48VslIkkKVrfau4P9GLPNDkY8iso';
// Initialize Supabase client

export const supabase = createClient(supabaseUrl, supabaseKey);