import create from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isLoggedIn: false,

  login: (userData) =>
    set((state) => ({
      user: userData,
      role: userData.rol,
      isLoggedIn: true,
    })),

  logout: () =>
    set((state) => ({
      user: null,
      role: null,
      isLoggedIn: false,
    })),
}));

export default useAuthStore;
