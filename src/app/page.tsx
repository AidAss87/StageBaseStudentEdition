import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";

export default function Home() {
  return (
    <div>
      <h1 className="">Wow </h1>
      <div>
        <CircularProgress value={0} size={120} strokeWidth={10} color="green" />
      </div>
    </div>
  );
}
