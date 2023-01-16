import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

    return (
        <header className={classes.header}>
            <div className={classes.logo}><Link to='/'>FoodyMe</Link></div>
            <nav>
                <ul>
                    <li>
                        <Link to='/login'>Log in</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Sign up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
