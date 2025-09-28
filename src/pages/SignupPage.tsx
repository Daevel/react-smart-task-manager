import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import { toast } from "sonner";

export default function SignupPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signUp(email, password);
      if(data) {
        toast.success("Account created!", {
        description: `Welcome ${data.user?.email}. Please check your inbox to verify.`,
      });
      navigate("/login");
      }
    } catch(error: any) {
      toast.error("Signup error: ", {
        description: `Errore durante la fase di signup ${error.message}`,
        action: {
          label: "OK",
          onClick: () => console.log("OK clicked")
        }
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Signup your new account</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="david.jones@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
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
          <Button form="signup-form" type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Submit"}
          </Button>
          <Button className="w-full" variant="outline" onClick={() => navigate("/login")}>
            Back to login page
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}