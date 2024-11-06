import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
      'https://thoahqxlaarsnvpxgzkk.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRob2FocXhsYWFyc252cHhnemtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjg3NzAsImV4cCI6MjA0NTg0NDc3MH0.Xjo2LK65TrUjoLIva4igsPny3S9d3zhLmd6hbvuPSr4'
)
