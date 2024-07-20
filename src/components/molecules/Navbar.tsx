type NavbarLink = {
  title: string;
  url: string;
};

type NavbarProps = {
  links: NavbarLink[];
};

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="navbar">
      {props.links.map((link) => (
        <button key={link.url}>
          <a href={link.url}>{link.title}</a>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
