import { Suspense, type ReactNode } from "react";
import Loader from "../components/loader";

export default function RouteSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
