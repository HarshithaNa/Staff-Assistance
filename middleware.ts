import { NextResponse, type NextRequest } from "next/server";
import { API } from "./constants/api-routes";
import { cookies } from "next/headers";
import { refreshAccessToken } from "./utils/user";
import SignInPopUp from "./components/client/signout";

export default async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;
  const protectedRoutes = ["/chat-bot"];
  const nonProtectedRoutes = ["/signin"];
  let newAcessToken = ""

  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }



  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${API.USER}`,
    { headers: req.headers }
  );
  const { result } = await response.json();

  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.includes(route)) &&
    !result
  ) {
    if (!refreshToken) {
    
      console.log("no refresh token");
      const absoluteURL = new URL("/signin", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }else {

     const newAcessTokenResponse= await refreshAccessToken(refreshToken || "");
     newAcessToken = newAcessTokenResponse.accessToken
    }

    const isNonProtectedRoute = nonProtectedRoutes.some((route) =>
      req.nextUrl.pathname.includes(route)
    );
  
    if (isNonProtectedRoute) {
      console.log("yooooo")
      if (accessToken || newAcessToken) {
        console.log("we have acess token redirecting it to chatbot")
        const projectsURL = new URL(protectedRoutes[0], req.nextUrl.origin);
        return NextResponse.redirect(projectsURL.toString());
      } else {
        return NextResponse.next();
      }
    }
  
    if (!newAcessToken && !refreshToken) {
      console.log("Failed to refresh access token. Redirecting to signout.");
      const absoluteURL = new URL("/signin", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else {
      console.log("there is refresh token and access token");
      // return NextResponse.next();
    }
  }

if (
    refreshToken &&
    nonProtectedRoutes.some((route) => req.nextUrl.pathname.includes(route))
  ) {
    return NextResponse.redirect(
      new URL(protectedRoutes[0], req.nextUrl.origin)
    );
  }

  return NextResponse.next();
}
