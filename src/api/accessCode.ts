const STORAGE_KEY = 'roast-ai-manager:access-code'

export function getStoredAccessCode(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredAccessCode(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // localStorage unavailable — access code just won't persist across reloads
  }
}

export function clearStoredAccessCode(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
}
