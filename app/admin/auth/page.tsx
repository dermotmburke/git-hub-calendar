import { readStoredToken } from '@/lib/token-store';

export const dynamic = 'force-dynamic';

export default async function AdminAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string; success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET;
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000';
  const callbackUrl = `${appUrl}/api/auth/google/callback`;

  if (adminSecret && params.secret !== adminSecret) {
    return (
      <div className="p-8 font-mono text-sm">
        <p className="text-red-600 dark:text-red-400">
          Unauthorized. Append <code>?secret=&lt;ADMIN_SECRET&gt;</code> to the URL.
        </p>
      </div>
    );
  }

  const stored = readStoredToken();
  const hasEnvToken = !!process.env.GOOGLE_REFRESH_TOKEN;
  const connectUrl = `/api/auth/google?secret=${encodeURIComponent(params.secret ?? '')}`;

  const errorMessage = (() => {
    switch (params.error) {
      case 'no_refresh_token':
        return (
          'Google did not return a refresh token — the app may already be authorised. ' +
          'Revoke access at myaccount.google.com/permissions and try again.'
        );
      case 'access_denied':
        return 'Access was denied. Please try again and approve the permissions.';
      case 'no_code':
        return 'No authorisation code received from Google.';
      default:
        return params.error ?? null;
    }
  })();

  return (
    <div className="max-w-lg mx-auto p-8 space-y-6">
      <h1 className="font-headline text-4xl sm:text-6xl uppercase tracking-tighter leading-none">
        Google Auth
      </h1>

      {/* Token status */}
      <div className="border-2 border-black dark:border-white p-4 space-y-1">
        <p className="text-xs font-black uppercase">Token Status</p>
        {stored ? (
          <>
            <p className="font-mono text-sm text-green-600 dark:text-green-400">✓ Connected (file token)</p>
            <p className="font-mono text-xs text-gray-500">
              Stored {new Date(stored.stored_at).toLocaleString()}
            </p>
          </>
        ) : hasEnvToken ? (
          <p className="font-mono text-sm text-yellow-600 dark:text-yellow-400">
            ⚠ Using GOOGLE_REFRESH_TOKEN env var — connect via UI to switch to a file token
          </p>
        ) : (
          <p className="font-mono text-sm text-red-600 dark:text-red-400">✗ No token configured</p>
        )}
      </div>

      {/* Feedback */}
      {params.success && (
        <p className="font-mono text-sm text-green-600 dark:text-green-400">
          ✓ Token saved successfully. Google Calendar is connected.
        </p>
      )}
      {errorMessage && (
        <p className="font-mono text-sm text-red-600 dark:text-red-400">
          Error: {errorMessage}
        </p>
      )}

      {/* Google Cloud Console setup */}
      <div className="border-2 border-black dark:border-white p-4 space-y-2">
        <p className="text-xs font-black uppercase">Required: Google Cloud Console Setup</p>
        <p className="text-xs">
          Add the following as an authorised redirect URI on your OAuth 2.0 credentials
          (APIs &amp; Services → Credentials → your OAuth client):
        </p>
        <code className="block text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 break-all">
          {callbackUrl}
        </code>
        <p className="text-xs text-gray-500">
          If your credentials are &ldquo;Desktop App&rdquo; type you will need to change them to
          &ldquo;Web application&rdquo; type to allow redirect URIs.
        </p>
      </div>

      {/* Connect button */}
      <a
        href={connectUrl}
        className="block text-center text-sm font-black uppercase border-2 border-black dark:border-white px-4 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      >
        {stored ? 'Re-authorise Google Calendar' : 'Connect Google Calendar'}
      </a>
    </div>
  );
}
