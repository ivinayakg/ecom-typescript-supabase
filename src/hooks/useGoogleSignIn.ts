import { supabase } from "../utility/supabase";

export const useGoogleSignIn = () => {
  const signIn = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/signin",
      },
    });
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut({
      scope: "global",
    });
    if (!res.error) window.history.go(0);
  };

  return { signIn, signOut };
};
