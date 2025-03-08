"use client";

import { User } from "firebase/auth";

// Set session cookie via client-side
export async function handleUserSession(user: User | null) {
  if (user) {
    // Get the ID token
    const idToken = await user.getIdToken();
    
    // Store in localStorage for client-side auth checks
    localStorage.setItem("session", idToken);
    
    // In a real app, you would also call a server action to set an HTTP-only cookie
    // await setServerSessionCookie(idToken);
  } else {
    // Clear session
    localStorage.removeItem("session");
    
    // In a real app, you would also call a server action to clear the HTTP-only cookie
    // await clearServerSessionCookie();
  }
}

// Get session from client-side
export function getClientSession(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("session");
  }
  return null;
} 