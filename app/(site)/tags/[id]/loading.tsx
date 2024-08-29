import { CardSkeleton } from "../../(home)/loading"

const loading = () => {
  return (
    <main className="flex items-center flex-col gap-y-2 w-full">
      {
    [1,2,3].map((i)=>(
        <div key={i} className="space-y-2">
            <CardSkeleton />
        </div>
    ))
}
    </main>
  )
}

export default loading
