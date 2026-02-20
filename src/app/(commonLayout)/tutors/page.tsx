export const dynamic = "force-dynamic";

export default async function Tutors() {
  //** For simulating loading time
  await new Promise((resolve) => { setTimeout(resolve, 4000) });

  // ** For simulating error
  // throw new Error("Something Went Wrong!")
  return (
    <div>
      <h1>This is tutors page</h1>
    </div>
  )
}
