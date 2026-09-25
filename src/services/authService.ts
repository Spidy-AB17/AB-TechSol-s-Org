/**
 * Admin Authentication Service
 * Credentials configured:
 * Username: ABSIR
 * Password: Abtechsol@2026
 */

export const ADMIN_USERNAME = 'ABSIR';
export const ADMIN_PASSWORD = 'Abtechsol@2026';

const AUTH_STORAGE_KEY = 'ab_techsol_admin_auth';
const REMEMBER_STORAGE_KEY = 'ab_techsol_admin_remember';

export interface AdminSession {
  username: string;
  role: string;
  fullName: string;
  email: string;
  loggedInAt: string;
  token: string;
}

/**
 * Check if admin is currently authenticated
 */
export function isAuthenticated(): boolean {
  try {
    // Check session storage first
    const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (sessionAuth) {
      const parsed = JSON.parse(sessionAuth);
      if (parsed?.token && parsed?.username?.toUpperCase() === ADMIN_USERNAME) {
        return true;
      }
    }

    // Check local storage if remember me was enabled
    const localAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (localAuth) {
      const parsed = JSON.parse(localAuth);
      if (parsed?.token && parsed?.username?.toUpperCase() === ADMIN_USERNAME) {
        // Also keep in session
        sessionStorage.setItem(AUTH_STORAGE_KEY, localAuth);
        return true;
      }
    }
  } catch (err) {
    console.error('Failed to read admin auth state:', err);
  }
  return false;
}

/**
 * Get active admin session details
 */
export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Attempt admin login
 */
export function login(
  username: string,
  pass: string,
  rememberMe: boolean = true
): { success: boolean; error?: string; session?: AdminSession } {
  const cleanUser = username.trim();
  const cleanPass = pass.trim();

  if (!cleanUser) {
    return { success: false, error: 'Please enter the admin username.' };
  }

  if (!cleanPass) {
    return { success: false, error: 'Please enter the admin security password.' };
  }

  // Verify username and password (case-insensitive username check, exact password check)
  if (cleanUser.toUpperCase() !== ADMIN_USERNAME) {
    return {
      success: false,
      error: 'Invalid admin username. Access is restricted to authorized personnel.',
    };
  }

  if (cleanPass !== ADMIN_PASSWORD) {
    return {
      success: false,
      error: 'Incorrect security password. Please verify your credentials and try again.',
    };
  }

  // Create session object
  const session: AdminSession = {
    username: ADMIN_USERNAME,
    role: 'Super Administrator & Tech Lead',
    fullName: 'AB &middot; Founder',
    email: 'abtechsol660@gmail.com',
    loggedInAt: new Date().toISOString(),
    token: `ABSIR_TOKEN_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  };

  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      localStorage.setItem(REMEMBER_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(REMEMBER_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to store auth state:', err);
  }

  return { success: true, session };
}

/**
 * Admin logout
 */
export function logout(): void {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear admin session:', err);
  }
}
