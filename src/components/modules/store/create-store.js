import ThemeStore from './theme-store';

const createThemeStore = state => {
  const themeStore = new ThemeStore();

  const getState = () => themeStore.getState();
  
  const setState = state => themeStore.getState(state);

  return { getState, setState };
};

export default createThemeStore;
