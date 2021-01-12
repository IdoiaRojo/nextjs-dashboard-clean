import Link from "next/link";

const NavButton = props => (
  <Link href={props.path}>
    <div className="NavButton">
      <div className="Icon">{props.icon}</div>
      <span className="Label">{props.label}</span>
    </div>
  </Link>
);

export default NavButton;
