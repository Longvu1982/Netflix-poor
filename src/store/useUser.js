import { create } from "zustand";

const useUserStore = create((set) => ({
  username: "",
  email: "a",
  password: "",
  phone: "",

  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPhone: (phone) => set({ phone }),
  setUser:(user) => set({...user}),

  reset: () => set({ username: "", email: "", password: "", phone: "" }),
}));

export default useUserStore;
