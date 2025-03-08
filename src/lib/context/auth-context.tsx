"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { handleUserSession } from "@/lib/firebase/session";
import { User } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Handle session
        await handleUserSession(firebaseUser);
        
        // Get additional user data from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        const role = userDoc.data()?.role;
        
        let userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          role: role || "user",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          enrolledCourses: [],
          completedLessons: {},
          progress: {},
          completedCourses: []
        };
        
        if (userDoc.exists()) {
          // Merge Firestore data with auth data
          userData = {
            ...userData,
            ...userDoc.data() as Partial<User>,
          };
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, userData);
        }
        
        setUser(userData);
        setIsAdmin(userData.role === "admin");
      } else {
        // Clear session
        await handleUserSession(null);
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        id: userCredential.user.uid,
        email: email,
        name: name,
        role: "user",
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        enrolledCourses: [],
        completedLessons: {},
        progress: {},
        completedCourses: []
      };

      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
      setUser(newUser);
      router.push("/courses");
      toast.success("Account created successfully!");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign up error:", authError);
      toast.error(authError.message || "Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      
      if (!userDoc.exists()) {
        const newUser: User = {
          id: result.user.uid,
          email: result.user.email!,
          name: result.user.displayName || "User",
          role: "user",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          enrolledCourses: [],
          completedLessons: {},
          progress: {},
          completedCourses: []
        };
        
        await setDoc(doc(db, "users", result.user.uid), newUser);
        setUser(newUser);
      } else {
        setUser(userDoc.data() as User);
      }
      
      router.push("/courses");
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Google sign in error:", authError);
      toast.error(authError.message || "Failed to sign in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser(userData);
        
        if (userData.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/courses");
        }
        
        toast.success("Successfully signed in!");
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign in error:", authError);
      toast.error(authError.message || "Failed to sign in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      router.push("/");
      toast.success("Successfully signed out!");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign out error:", authError);
      toast.error(authError.message || "Failed to sign out");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 