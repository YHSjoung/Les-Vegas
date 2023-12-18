import Link from "next/link";

const Header = () => {
    
    return(
        <>
            <nav className="blue py-4 px-4 flex items-center justify-between">
                <Link href='/'>
                    Gambling
                </Link>
                <Link href='/signIn'>
                    SignIn
                </Link>
                <Link href='/signOut'>
                    SignOut
                </Link>
            </nav>
        </>
    )
};

export default Header; 