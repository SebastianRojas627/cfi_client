import { UserSession } from "../context/auth-types";

const SESSION_KEY = "nexusUserSession";

export function saveSession(data: UserSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getSession(): UserSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
