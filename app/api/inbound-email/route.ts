import { createServiceClient } from '@/lib/supabase/server'
import { createInboundHandler } from '@/lib/directory-inbound'

export const POST = createInboundHandler({
  "tenant": "directories--fertility-specialist",
  "directory": "fertility-specialist",
  "domains": [
    "fertilityspecialistdirectory.com",
    "mail.fertilityspecialistdirectory.com"
  ],
  "table": "fertility_specialist_inbound_emails"
}, { db: async () => createServiceClient() })
