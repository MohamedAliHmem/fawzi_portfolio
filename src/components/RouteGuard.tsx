"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
	children: React.ReactNode;
}

// Client-side authentication using localStorage
const AUTH_KEY = "portfolio_auth";
const AUTH_EXPIRY_KEY = "portfolio_auth_expiry";

const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const authToken = localStorage.getItem(AUTH_KEY);
  const expiryTime = localStorage.getItem(AUTH_EXPIRY_KEY);
  
  if (!authToken || !expiryTime) return false;
  
  if (Date.now() > parseInt(expiryTime)) {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
    return false;
  }
  
  return authToken === "authenticated";
};

const setAuthentication = (): void => {
  if (typeof window === "undefined") return;
  
  const expiryTime = Date.now() + (60 * 60 * 1000); // 1 hour
  localStorage.setItem(AUTH_KEY, "authenticated");
  localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);
        setAuthenticated(isAuthenticated());
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = () => {
    // You should replace this with your actual password
    // For security, consider using environment variables or a more secure method
    const correctPassword = "your-password-here";
    
    if (password === correctPassword) {
      setAuthentication();
      setAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
		return <NotFound />;
	}

  if (isPasswordRequired && !authenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
