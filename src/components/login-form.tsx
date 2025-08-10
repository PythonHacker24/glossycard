import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.49 12.27c0-.82-.07-1.58-.2-2.32H12v4.39h6.48c-.29 1.49-1.17 2.76-2.48 3.61v3h4c2.34-2.15 3.49-5.32 3.49-8.68z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.94l-4-3c-1.11.75-2.53 1.19-3.93 1.19-3.02 0-5.57-2.04-6.48-4.79H1.38v3.03C3.34 21.54 7.36 24 12 24z"/>
          <path fill="#FBBC05" d="M5.52 14.46c-.25-.75-.39-1.55-.39-2.46s.14-1.71.39-2.46V6.51H1.38C.5 8.18 0 10.03 0 12s.5 3.82 1.38 5.49l4.14-3.03z"/>
          <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.81l3.42-3.42C17.95 1.21 15.24 0 12 0 7.36 0 3.34 2.46 1.38 6.51l4.14 3.03C6.43 6.79 8.98 4.75 12 4.75z"/>
        </svg>

          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
