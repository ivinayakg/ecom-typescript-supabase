import { useNavigate } from "react-router";
import { supabase } from "../utility/supabase";

export const useGoogleSignIn = () => {
  const navigate = useNavigate();
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
    if (!res.error) navigate(0);
  };

  return { signIn, signOut };
};
