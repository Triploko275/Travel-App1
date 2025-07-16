import { Suspense } from "react";
import PackagesClient from "./PackagesClient";

export default function AllPackagesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PackagesClient />
    </Suspense>
  );
}
