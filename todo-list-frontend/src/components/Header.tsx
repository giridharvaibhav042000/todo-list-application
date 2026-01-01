import { Link } from "react-router-dom";

const Header = () => {
 return (
    <header className="app-header">
        <Link to={'/'}>
            <h1 className="app-header__title">Todo <span>List</span></h1>
        </Link>
    </header>
 )
}
export default Header;