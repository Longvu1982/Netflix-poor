import { create } from "zustand";

const useUserStore = create((set) => ({
    userName: "",
    email: "",
    phoneNumber: "",
    accessToken: "",
    setUsername: (userName) => set({ userName }),
    setEmail: (email) => set({ email }),
    setPhone: (phoneNumber) => set({ phoneNumber }),
    setToken: (accessToken) => set({ accessToken }),
    setUser: (user) => set({ ...user }),

    logout: () => set({ username: "", email: "", password: "", phone: "" }),
}));

export default useUserStore;
