import { Suspense } from "react";
import { ViewPage } from "../components/ViewPage";

export default function Page(){
  return (
    <Suspense>
            <ViewPage />
    </Suspense>
  )
}