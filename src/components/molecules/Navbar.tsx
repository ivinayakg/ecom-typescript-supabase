import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";

type NavbarLink = {
  title: string;
  url: string;
};

type NavbarProps = {
  links: NavbarLink[];
};

const Navbar = (props: NavbarProps) => {
  const user = useUser();
  const { signOut, signIn } = useGoogleSignIn();

  return (
    <nav className="w-[80vw] bg-white border-2 rounded-md h-[50px] mx-auto flex items-center justify-between p-8">
      <div>
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <div className="flex justify-center items-center gap-8">
        {props.links.map((link) => (
          <button key={link.url}>
            <Link to={link.url} className="text-2xl font-thin">
              {link.title}
            </Link>
          </button>
        ))}
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
