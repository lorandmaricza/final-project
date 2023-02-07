import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
    // console.log('layout: ' + props.loggedIn);

    return (
        <div className={classes.wrapperDiv}>
            <MainNavigation loggedIn={props.loggedIn} />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;