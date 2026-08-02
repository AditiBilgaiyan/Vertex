import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://arlwwmyvtmkfrvynexam.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybHd3bXl2dG1rZnJ2eW5leGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTc4NzksImV4cCI6MjEwMDEzMzg3OX0.i7uuOSFVJzCiFlWw6pKNb74eEZ0PM0pSAHbBJl6axLk'

export const supabase = createClient(supabaseUrl, supabaseKey)