import { Suspense } from "react";
import { DeleteNote } from "../components/DeleteNote";

export default function Page(){
  return (
    <Suspense>
            <DeleteNote />
    </Suspense>
  )
}