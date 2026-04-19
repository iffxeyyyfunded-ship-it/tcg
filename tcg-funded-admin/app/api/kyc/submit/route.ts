// app/api/kyc/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, country, documentType, storagePath } = body

    // 1. Submit KYC document record
    const { data: kycDoc, error: kycError } = await supabaseAdmin
      .from('kyc_documents')
      .insert({
        trader_id: user.id,
        document_type: documentType,
        storage_path: storagePath,
        status: 'pending',
      })
      .select()
      .single()

    if (kycError) throw kycError

    // 2. Update profile status
    await supabaseAdmin
      .from('profiles')
      .update({
        full_name: fullName,
        country: country,
        kyc_status: 'submitted',
        kyc_submitted_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    return NextResponse.json({ success: true, kycId: kycDoc.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
