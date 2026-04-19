import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`

// ─── Base HTML template ───────────────────────────────────────────────────────
function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background: #050505; color: #f5f0e8; font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .logo { font-size: 28px; font-weight: 900; letter-spacing: 3px; color: #F5A623; margin-bottom: 32px; }
  .logo span { color: #f5f0e8; }
  .card { background: #111111; border: 1px solid #1e1e1e; border-radius: 12px; padding: 32px; margin: 24px 0; }
  .heading { font-size: 24px; font-weight: 800; color: #f5f0e8; margin: 0 0 16px; }
  .text { font-size: 15px; color: #a0a0a0; line-height: 1.6; margin: 0 0 16px; }
  .btn { display: inline-block; background: #F5A623; color: #050505; font-weight: 800; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 16px 0; letter-spacing: 0.5px; }
  .divider { border: none; border-top: 1px solid #1e1e1e; margin: 24px 0; }
  .stat { display: inline-block; background: #0a0a0a; border: 1px solid #1e1e1e; border-radius: 8px; padding: 16px 24px; margin: 8px 8px 8px 0; text-align: center; }
  .stat-value { font-size: 24px; font-weight: 900; color: #F5A623; }
  .stat-label { font-size: 12px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 1px; }
  .footer { text-align: center; font-size: 12px; color: #555; margin-top: 40px; }
  .badge { display: inline-block; background: rgba(245,166,35,0.15); color: #F5A623; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px; letter-spacing: 1px; margin-bottom: 16px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="logo">TCG<span> FUNDED</span></div>
  ${content}
  <div class="footer">
    <p>TCG Funded | support@tcgfunded.com</p>
    <p>You received this because you have an account with TCG Funded.</p>
    <p style="color:#333">This is simulated trading — no real capital is at risk.</p>
  </div>
</div>
</body>
</html>`
}

// ─── Welcome Email ────────────────────────────────────────────────────────────
export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to TCG Funded — Your Journey Starts Now',
    html: baseTemplate(`
      <div class="badge">WELCOME TO THE GUILD</div>
      <div class="card">
        <h1 class="heading">Welcome, ${name}. 🏆</h1>
        <p class="text">You've joined TCG Funded — the prop firm that actually wants you to win. No black boxes, no payout denials, no hidden rules.</p>
        <p class="text">Here's what happens next:</p>
        <p class="text">1️⃣ &nbsp;<strong style="color:#f5f0e8">Complete KYC</strong> — verify your identity to unlock payouts</p>
        <p class="text">2️⃣ &nbsp;<strong style="color:#f5f0e8">Fund your first account</strong> — choose your market and account size</p>
        <p class="text">3️⃣ &nbsp;<strong style="color:#f5f0e8">Start trading</strong> — all styles allowed, zero commissions</p>
        <p class="text">4️⃣ &nbsp;<strong style="color:#f5f0e8">Get paid every Friday</strong> — no denials, no caps</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">GO TO DASHBOARD</a>
        <hr class="divider">
        <p class="text" style="margin:0; font-size:13px">Questions? Join our Discord community or email support@tcgfunded.com</p>
      </div>
    `)
  })
}

// ─── Order Confirmation ───────────────────────────────────────────────────────
export async function sendOrderConfirmationEmail(to: string, data: {
  name: string
  orderNumber: string
  market: string
  accountSize: string
  drawdownType: string
  amount: string
  accountNumber: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed — ${data.accountSize} ${data.market.toUpperCase()} Account`,
    html: baseTemplate(`
      <div class="badge">ORDER CONFIRMED</div>
      <div class="card">
        <h1 class="heading">You're Funded. 💰</h1>
        <p class="text">Your TCG Funded account has been created. Complete KYC to activate trading.</p>
        <div>
          <div class="stat">
            <div class="stat-value">${data.accountSize}</div>
            <div class="stat-label">Account Size</div>
          </div>
          <div class="stat">
            <div class="stat-value">${data.market.toUpperCase()}</div>
            <div class="stat-label">Market</div>
          </div>
          <div class="stat">
            <div class="stat-value">${data.drawdownType.replace('_', ' ').toUpperCase()}</div>
            <div class="stat-label">Drawdown Type</div>
          </div>
        </div>
        <hr class="divider">
        <p class="text"><strong style="color:#f5f0e8">Order Number:</strong> ${data.orderNumber}</p>
        <p class="text"><strong style="color:#f5f0e8">Account Number:</strong> ${data.accountNumber}</p>
        <p class="text"><strong style="color:#f5f0e8">Amount Paid:</strong> ${data.amount}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">ACTIVATE ACCOUNT</a>
      </div>
    `)
  })
}

// ─── Payout Confirmed ─────────────────────────────────────────────────────────
export async function sendPayoutConfirmedEmail(to: string, data: {
  name: string
  amount: string
  poolShare: string
  accountNumber: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Payout Processed — ${data.amount} Incoming 🎉`,
    html: baseTemplate(`
      <div class="badge">PAYOUT PROCESSED</div>
      <div class="card">
        <h1 class="heading">Money's on the way, ${data.name}. 🏆</h1>
        <p class="text">Your Friday payout has been processed and will clear by Monday.</p>
        <div>
          <div class="stat">
            <div class="stat-value">${data.amount}</div>
            <div class="stat-label">Your Payout</div>
          </div>
          <div class="stat">
            <div class="stat-value">${data.poolShare}%</div>
            <div class="stat-label">Pool Share</div>
          </div>
        </div>
        <hr class="divider">
        <p class="text"><strong style="color:#f5f0e8">Account:</strong> ${data.accountNumber}</p>
        <p class="text">Bank transfers clear within 1–3 business days depending on your bank.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">VIEW DASHBOARD</a>
      </div>
    `)
  })
}

// ─── KYC Approved ────────────────────────────────────────────────────────────
export async function sendKycApprovedEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'KYC Approved — You Can Now Request Payouts',
    html: baseTemplate(`
      <div class="badge">KYC APPROVED ✓</div>
      <div class="card">
        <h1 class="heading">You're verified, ${name}!</h1>
        <p class="text">Your identity has been verified. You are now fully eligible to request payouts every Friday.</p>
        <p class="text">Remember the rules:</p>
        <p class="text">✅ &nbsp;Minimum 5 trading days per cycle</p>
        <p class="text">✅ &nbsp;Hit the 3% profit goal</p>
        <p class="text">✅ &nbsp;Stay within drawdown limits</p>
        <p class="text">✅ &nbsp;Activate by Friday 5 PM EST</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">START TRADING</a>
      </div>
    `)
  })
}

// ─── Account Breach Warning ───────────────────────────────────────────────────
export async function sendBreachWarningEmail(to: string, data: {
  name: string
  accountNumber: string
  drawdownPct: string
  maxDrawdownPct: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `⚠️ Drawdown Warning — Account ${data.accountNumber}`,
    html: baseTemplate(`
      <div class="badge" style="background:rgba(239,68,68,0.15);color:#ef4444">⚠️ DRAWDOWN WARNING</div>
      <div class="card">
        <h1 class="heading" style="color:#ef4444">Drawdown Alert</h1>
        <p class="text">Your account is approaching the maximum drawdown limit. Please manage your risk carefully.</p>
        <div>
          <div class="stat">
            <div class="stat-value" style="color:#ef4444">${data.drawdownPct}%</div>
            <div class="stat-label">Current Drawdown</div>
          </div>
          <div class="stat">
            <div class="stat-value">${data.maxDrawdownPct}%</div>
            <div class="stat-label">Max Allowed</div>
          </div>
        </div>
        <hr class="divider">
        <p class="text"><strong style="color:#f5f0e8">Account:</strong> ${data.accountNumber}</p>
        <p class="text">If you reach the max drawdown limit, your account will be terminated. Reduce position sizes and manage risk carefully.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">VIEW ACCOUNT</a>
      </div>
    `)
  })
}

// ─── Password Reset ───────────────────────────────────────────────────────────
export async function sendPasswordResetEmail(to: string, resetLink: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Reset Your TCG Funded Password',
    html: baseTemplate(`
      <div class="card">
        <h1 class="heading">Password Reset Request</h1>
        <p class="text">We received a request to reset your password. Click the button below to create a new password.</p>
        <a href="${resetLink}" class="btn">RESET PASSWORD</a>
        <hr class="divider">
        <p class="text" style="font-size:13px">This link expires in 1 hour. If you did not request this, ignore this email.</p>
      </div>
    `)
  })
}
