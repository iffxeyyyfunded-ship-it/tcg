import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components'

interface Props {
  name: string
  payoutAmount: number
  dashboardUrl: string
}

export default function PayoutPaidEmail({ name, payoutAmount, dashboardUrl }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#0A0A0A', fontFamily: 'Inter, sans-serif', color: '#FFFFFF' }}>
        <Container style={{ maxWidth: '600px', margin: '40px auto' }}>
          <Section style={{ backgroundColor: '#111111', borderRadius: '12px', padding: '48px', border: '1px solid #222222' }}>
            <Text style={{ color: '#00C896', fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>
              TCG FUNDED
            </Text>
            <Hr style={{ borderColor: '#222222', margin: '24px 0' }} />
            <Text style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              PAYOUT DEPLOYED, {name.toUpperCase()}
            </Text>
            <Text style={{ color: '#AAAAAA', fontSize: '15px', margin: '24px 0', lineHeight: '1.6' }}>
              Your weekly settlement allocation has been successfully approved and distributed.
            </Text>

            <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #222222', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
              <Text style={{ color: '#666666', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>SETTLEMENT VOLUME</Text>
              <Text style={{ color: '#00C896', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>${payoutAmount.toFixed(2)}</Text>
            </div>
            
            <Button
              href={dashboardUrl}
              style={{
                backgroundColor: '#00C896',
                color: '#000000',
                borderRadius: '4px',
                padding: '16px 32px',
                fontWeight: '800',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'none',
                display: 'inline-block',
                width: '100%',
                textAlign: 'center'
              }}
            >
              VIEW LEDGER
            </Button>
            <Text style={{ color: '#666666', fontSize: '12px', marginTop: '32px', lineHeight: '1.6' }}>
              Funds should reflect in your registered wallet shortly. Weekly settlements execute every Friday. Zero commissions. Total transparency.
            </Text>
            <Hr style={{ borderColor: '#222222', marginTop: '40px' }} />
            <Text style={{ color: '#444444', fontSize: '10px', textAlign: 'center', fontWeight: 'bold', letterSpacing: '1px' }}>
              TCG FUNDED · F1-GRADE FINTECH · SIMULATED TRADING
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
