import { create } from "zustand";

const useUserStore = create((set) => ({
    username: "",
    email: "",
    password: "",
    phone: "",
    token: "",
    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setPhone: (phone) => set({ phone }),
    setToken: (token) => set({ token }),
    setUser: (user) => set({ ...user }),

    reset: () => set({ username: "", email: "", password: "", phone: "" }),
}));

export default useUserStore;
