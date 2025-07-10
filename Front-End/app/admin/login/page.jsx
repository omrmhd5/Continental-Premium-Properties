"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Home } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function AdminLogin() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === "ar";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } catch (error) {
      setError(
        language === "ar"
          ? "اسم المستخدم أو كلمة المرور غير صحيحة"
          : language === "fr"
          ? "Nom d'utilisateur ou mot de passe invalide"
          : "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4">
        <Card className="elegant-card border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                <Lock className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-serif">
              {isArabic ? "تسجيل الدخول" : "Admin Login"}
            </CardTitle>
            <CardDescription>
              {isArabic
                ? "قم بتسجيل الدخول للوصول إلى لوحة التحكم"
                : "Sign in to access the admin dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    {isArabic ? "اسم المستخدم" : "Username"}
                  </Label>
                  <Input
                    id="username"
                    placeholder={isArabic ? "اسم المستخدم" : "Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm ${
                      isArabic ? "text-right" : ""
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {isArabic ? "كلمة المرور" : "Password"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={isArabic ? "كلمة المرور" : "Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm ${
                      isArabic ? "text-right" : ""
                    }`}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={isLoading}>
              {isLoading
                ? language === "ar"
                  ? "جاري تسجيل الدخول..."
                  : language === "fr"
                  ? "Connexion en cours..."
                  : "Logging in..."
                : language === "ar"
                ? "تسجيل الدخول"
                : language === "fr"
                ? "Se Connecter"
                : "Login"}
            </Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                {language === "ar"
                  ? "العودة إلى الصفحة الرئيسية"
                  : language === "fr"
                  ? "Retour à l'Accueil"
                  : "Back to Homepage"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            {language === "ar"
              ? "English"
              : language === "fr"
              ? "العربية"
              : "Français"}
          </Button>
        </div>
      </div>
    </div>
  );
}
