import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/api/auth";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data) {
        toast.success("Login success: ", {
          description: `Welcome ${data.user?.email} !`,
          action: {
            label: "OK",
            onClick: () => console.log("OK clicked")
          }
        })
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error("Login error: ", {
        description: `Errore durante la fase di login ${error.message}`,
        action: {
          label: "OK",
          onClick: () => console.log("OK clicked")
        }
      })
    } finally {
      setLoading(false);
    }
  };

  const onSignupPage = () => {
    navigate("/signup");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button form="login-form" type="submit" className="w-full">
            {loading ? 'Login in corso...' : 'Login'}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4" onClick={onSignupPage}>
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}