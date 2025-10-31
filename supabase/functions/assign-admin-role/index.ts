import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { email } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    console.log(`Assigning admin role to: ${email}`)

    // Get user by email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers()
    
    if (userError) {
      throw userError
    }

    const user = users.users.find(u => u.email === email)

    if (!user) {
      throw new Error(`User with email ${email} not found. Please sign up first.`)
    }

    // Check if user already has admin role
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()

    if (existingRole) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `User ${email} already has admin role` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Assign admin role
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({ user_id: user.id, role: 'admin' })

    if (insertError) {
      throw insertError
    }

    console.log(`Successfully assigned admin role to ${email}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully assigned admin role to ${email}` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error assigning admin role:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
