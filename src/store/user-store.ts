import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { UserStore } from "@/types/store";

const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    })),
    {
      name: "user",
    }
  )
);

export default useUserStore;
