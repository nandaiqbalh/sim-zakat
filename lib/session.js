// lib/session.js
// React-cache-wrapped session getter.
// Calling getSession() multiple times in the same request (layout + page)
// only triggers one actual next-auth lookup.
import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const getSession = cache(() => getServerSession(authOptions));
