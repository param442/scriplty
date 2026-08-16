import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { verifyEmail } from "@/lib/utils";
type VerifyResult = {
  success: boolean;
  token: string | null;
};

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          throw new Error("No verification token found.");
        }

        // Only do this if verifyEmail() is your own endpoint.
        const res = await verifyEmail(token);

        if (mounted) {
          setResult(res);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to verify email token.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h1>Verify Email</h1>

      {loading && <p>Verifying...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && result && (
        <p>Verification {result.success ? "successful" : "failed"}.</p>
      )}

      {!loading && result?.success && (
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      )}
    </div>
  );
}
