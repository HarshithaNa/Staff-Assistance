import { NextResponse, type NextRequest } from "next/server";
import { API } from "./constants/api-routes";
import { cookies } from "next/headers";
import { refreshAccessToken } from "./utils/user";

export default async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value; 
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const protectedRoutes = ["/chat-bot"];
  const nonProtectedRoutes = ["/signin"];

  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  const isNonProtectedRoute = nonProtectedRoutes.some((route) =>
    req.nextUrl.pathname.includes(route)
  );

  if (isNonProtectedRoute) {
    if (accessToken) {
      const projectsURL = new URL(protectedRoutes[0], req.nextUrl.origin);
      return NextResponse.redirect(projectsURL.toString());
    } else {
      return NextResponse.next();
    }
  }

  if (!refreshToken) {
    const signInURL = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(signInURL.toString());
  }

  if (!accessToken) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken !== null) {
      const projectsURL = new URL(protectedRoutes[0], req.nextUrl.origin);
      return NextResponse.redirect(projectsURL.toString());
    } else {
      const signInURL = new URL("/signin", req.nextUrl.origin);
      return NextResponse.redirect(signInURL.toString());
    }
  } else {
    return NextResponse.next();
  }
}


