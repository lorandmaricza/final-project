import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useEffect, useState} from "react";
import {checkSession} from "../../utils/helpers";

// function MainNavigation(props) {
function MainNavigation() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkSession().then((data) => {
            if (data.status === "logged_in") {
                setLoggedIn(true);
            }
        }).catch(error => console.log(error));
    });

    // console.log('mainNav: ' + props.loggedIn);

    return (
        <header className={classes.header}>
            <div className={classes.logo}><Link to='/'>FoodyMe</Link></div>
            {/*{ !props.loggedIn &&*/}
            { !loggedIn &&
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
            }
        </header>
    );
}

export default MainNavigation;
