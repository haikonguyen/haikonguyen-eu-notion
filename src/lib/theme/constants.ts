export enum ThemeMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

export const THEME_STORAGE_KEY = 'haiko-theme';

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var m=localStorage.getItem('${THEME_STORAGE_KEY}')||'${ThemeMode.System}';var d=m==='${ThemeMode.Dark}'||(m==='${ThemeMode.System}'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.classList.toggle('light',!d);}catch(e){}})();`;
