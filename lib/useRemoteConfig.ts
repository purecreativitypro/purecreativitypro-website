import { useState, useEffect } from 'react';
import { getRemoteConfig, fetchAndActivate, getValue, type RemoteConfig } from 'firebase/remote-config';
import { app } from './firebase';

// Default values — used when Remote Config fails or hasn't loaded yet
const defaults: Record<string, string | boolean | number> = {
  hero_cta_text: 'BOOK A CLARITY CALL',
  show_splash_screen: true,
  show_email_capture: true,
  contact_form_enabled: true,
};

let rcInstance: RemoteConfig | null = null;

function getRC(): RemoteConfig {
  if (!rcInstance) {
    rcInstance = getRemoteConfig(app);
    rcInstance.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
    rcInstance.defaultConfig = defaults as Record<string, string>;
  }
  return rcInstance;
}

/**
 * Hook to read a Remote Config value.
 * Returns the default value until fetch completes, then re-renders with the remote value.
 */
export function useRemoteConfigValue(key: string): string {
  const [value, setValue] = useState<string>(() => {
    const def = defaults[key];
    return def !== undefined ? String(def) : '';
  });

  useEffect(() => {
    let cancelled = false;
    const rc = getRC();

    fetchAndActivate(rc)
      .then(() => {
        if (!cancelled) {
          const v = getValue(rc, key);
          setValue(v.asString());
        }
      })
      .catch(() => {
        // Silently fail — defaults are already set
      });

    return () => { cancelled = true; };
  }, [key]);

  return value;
}

/**
 * Hook to read a boolean Remote Config value.
 */
export function useRemoteConfigBoolean(key: string): boolean {
  const str = useRemoteConfigValue(key);
  return str === 'true' || str === '1';
}
