// import { AuthError, Session, User } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// import { supabase } from "../services/supabase";

type Session = {
  userInfo: {
    id: string;
    name: string;
  };
  date: Date;
};

type User = {
  id: string;
  password: string;
};

type AuthError = {
  errorCode: string;
  msg: string;
};

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  login: (email: string, password: string) => Promise<User | AuthError | null>;
  logout: () => Promise<void>;
  token: string;
  setToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session) => set({ session }),
      login: async (id, password) => {
        // if (!email) return Promise.reject("Email is required");
        // if (!password) return Promise.reject("Password is required");

        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // });
        // if (error) return Promise.reject(error);

        // set({ session: data.session });
        // return Promise.resolve(data.user);

        // TODO - 로그인 처리
        //
        set({
          session: {
            userInfo: { name: '박성욱(임시)', id: id },
            date: new Date(),
          },
        });
        return Promise.resolve({ id: id, password: password });
      },
      logout: async () => {
        set({ session: null });
        return Promise.resolve();
      },
      token: '',
      setToken: (token: string | undefined) => {
        set({ token: token });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// const useAuthStore = create<AuthState>();
// persist(
//   (set) => ({
//     session: null,
//     setSession: (session) => set({ session }),
//     login: async (id, password) => {
//       // if (!email) return Promise.reject("Email is required");
//       // if (!password) return Promise.reject("Password is required");

//       // const { data, error } = await supabase.auth.signInWithPassword({
//       //   email,
//       //   password,
//       // });
//       // if (error) return Promise.reject(error);

//       // set({ session: data.session });
//       // return Promise.resolve(data.user);

//       // TODO - 로그인 처리
//       //
//       set({
//         session: {
//           userInfo: { name: '임시 사용자', id: id },
//           date: new Date(),
//         },
//       });
//       return Promise.resolve({ id: id, password: password });
//     },
//     // register: async (email, password) => {
//     //   if (!email) return Promise.reject("Email is required");
//     //   if (!password) return Promise.reject("Password is required");

//     //   const { data, error } = await supabase.auth.signUp({
//     //     email,
//     //     password,
//     //   });
//     //   if (error) return Promise.reject(error);

//     //   set({ session: data.session });
//     //   return Promise.resolve(data.user);
//     // },
//     logout: async () => {
//       // TODO - 로그아웃 처리
//       // const { error } = await supabase.auth.signOut();
//       // if (error) return Promise.reject(error);
//       set({ session: null });
//       return Promise.resolve();
//     },
//   }),
//   {
//     name: 'auth-storage', // unique name
//     storage: createJSONStorage(() => AsyncStorage),
//   }
// );

export default useAuthStore;
