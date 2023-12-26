import { authMiddleware } from "@clerk/nextjs";
import { env } from "./lib/env";

export default authMiddleware({
  publicRoutes: ["/", "/signIn", "/signUp"],
  // apiRoutes: ["/api(/*)?",`${env.NEXT_PUBLIC_BASE_URL}/api(/*)?}`],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
