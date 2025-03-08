// Firebase Auth Error types
interface FirebaseError extends Error {
  code: string;
  customData?: {
    email?: string;
  };
}

// Error types for different operations
export type ErrorType = 
  | "AUTH_ERROR"
  | "AUTH_INVALID_EMAIL"
  | "AUTH_WEAK_PASSWORD"
  | "AUTH_EMAIL_IN_USE"
  | "AUTH_INVALID_CREDENTIALS"
  | "PROFILE_ERROR"
  | "COURSE_ERROR"
  | "PAYMENT_ERROR"
  | "API_ERROR"
  | "UNKNOWN_ERROR";

// Error messages mapping
export const ERROR_MESSAGES: Record<ErrorType, string> = {
  AUTH_ERROR: "Authentication failed. Please try again.",
  AUTH_INVALID_EMAIL: "Please enter a valid email address.",
  AUTH_WEAK_PASSWORD: "Password should be at least 6 characters long.",
  AUTH_EMAIL_IN_USE: "This email is already registered. Please try logging in.",
  AUTH_INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  PROFILE_ERROR: "Failed to update profile. Please try again.",
  COURSE_ERROR: "Failed to process course operation. Please try again.",
  PAYMENT_ERROR: "Payment processing failed. Please try again.",
  API_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again."
};

// Custom error class
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public originalError?: unknown
  ) {
    super(ERROR_MESSAGES[type]);
    this.name = "AppError";
  }
}

// Error handler utility
export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  // Handle Firebase Auth errors
  if (error instanceof Error && error.name === "FirebaseError") {
    const firebaseError = error as FirebaseError;
    
    switch (firebaseError.code) {
      case "auth/invalid-email":
        return new AppError("AUTH_INVALID_EMAIL", firebaseError);
      case "auth/weak-password":
        return new AppError("AUTH_WEAK_PASSWORD", firebaseError);
      case "auth/email-already-in-use":
        return new AppError("AUTH_EMAIL_IN_USE", firebaseError);
      case "auth/invalid-credential":
        return new AppError("AUTH_INVALID_CREDENTIALS", firebaseError);
      default:
        return new AppError("AUTH_ERROR", firebaseError);
    }
  }

  // Handle other known Error types
  if (error instanceof Error) {
    return new AppError("UNKNOWN_ERROR", error);
  }

  return new AppError("UNKNOWN_ERROR", error);
} 