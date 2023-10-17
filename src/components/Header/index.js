import { Link } from "react-router-dom";

import Cookies from "js-cookie";

const Header = () => {
  const onLogout = () => {
    Cookies.remove("jwt_token");
    window.location.reload();
  };

  return (
    <nav className="home-nav">
      <Link className="link-item" to="/">
        <div style={{ display: "flex" }}>
          <img
            src="https://png.pngtree.com/png-vector/20230224/ourmid/pngtree-kitchen-logo-png-image_6615814.png"
            // src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-food-logo-png-image_5687717.png"
            alt="logo"
            width="50"
          />
          <h1 className="home-logo-text">HR EATS</h1>
        </div>
      </Link>
      <ul className="ul-container" style={{ listStyleType: "none" }}>
        <Link to="/" className="link-item">
          <li>HOME</li>
        </Link>
        <Link to="/cart" className="link-item">
          <li>CART</li>
        </Link>
        <li>
          <button onClick={onLogout} type="button" className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
