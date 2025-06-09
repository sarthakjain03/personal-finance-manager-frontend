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
      isUserAuthenticating: false,
      setIsUserAuthenticating: (isUserAuthenticating: boolean) => {
        set((state) => {
          state.isUserAuthenticating = isUserAuthenticating;
        });
      },
    })),
    {
      name: "user",
      // onRehydrateStorage: () => {
      //     return (state, error) => {
      //         if (!error) state?.setIsUserAuthenticating(false)
      //         else console.error("Error occurred while hydrating user store: ", error);
      //       };
      // },
    }
  )
);

export default useUserStore;
