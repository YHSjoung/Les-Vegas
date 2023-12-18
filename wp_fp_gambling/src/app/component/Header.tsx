import Link from "next/link";
import { auth, UserButton } from "@clerk/nextjs";

const Header = () => {
    const {userId} = auth();
    console.log(userId);

    return(
        <>
            <nav className="blue py-4 px-4 flex items-center justify-between">
                <Link href='/'>
                    Gambling
                </Link>
                {!userId && (
                <Link href='/signIn'>
                    SignIn
                </Link>
                )}
                <UserButton afterSignOutUrl="/"/>
            </nav>
        </>
    )
};

export default Header; 