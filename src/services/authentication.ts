export async function requestOtp(phone: string) {
  const res = await fetch('https://xlcoxbizbuasgbjzfrlx.supabase.co/functions/v1/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}
