import { useEffect } from "react";
import { supabase } from "../../utility/supabase";
import { useNavigate } from "react-router";

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUserIdentities();
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("email", userData?.identities[0].identity_data?.email);

      const user = data[0];

      if (!user) {
        await supabase.from("user").insert({
          email: userData?.identities[0].identity_data?.email,
          name: userData?.identities[0].identity_data?.full_name,
          picture: userData?.identities[0].identity_data?.avatar_url,
        });
      }

      navigate("/");
    })();
  }, []);

  return (
    <div>
      <h1>Sign In</h1>
      <p>Welcome to the sign in page!</p>
    </div>
  );
}
