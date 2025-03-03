import type { APIRoute } from "astro";
import redirectsJson from "../../redirects.json";

export const prerender = false;
const redirects = redirectsJson as Record<string, string>;

export const GET: APIRoute = ({ params, redirect, rewrite }) => {
  const url = params.url || "";

  if (redirects[url]) {
    return redirect(redirects[url], 307);
  }

  return rewrite("/404");
};
