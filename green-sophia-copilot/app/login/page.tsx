'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!passcode) return;
    setBusy(true);
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    if (res.ok) {
      window.location.href = '/';
    } else {
      setError('あいことばが一致しません。もう一度確認してください。');
      setBusy(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: '12vh' }}>
      <div className="card">
        <div className="eyebrow">Members Only</div>
        <h1 style={{ fontSize: '2rem', lineHeight: 1.15 }}>Green Sophia<br />SNS Copilot</h1>
        <p className="muted" style={{ marginTop: 10 }}>部員共通の「あいことば」を入力してください。</p>
        <div className="field" style={{ textAlign: 'left' }}>
          <input
            type="password"
            placeholder="あいことば"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            autoFocus
          />
        </div>
        {error && <p style={{ color: 'var(--flag)', fontSize: '.86rem' }}>{error}</p>}
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={submit} disabled={busy}>
          {busy ? '認証中…' : '入室する'}
        </button>
        <p className="muted" style={{ marginTop: 14, fontSize: '.78rem' }}>
          あいことばが分からない場合は代表またはSNS班に確認してください。
        </p>
      </div>
    </div>
  );
}
