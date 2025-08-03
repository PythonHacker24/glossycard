import ProfileCard from "@/components/procard";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-10 p-8">
        <div className="w-full max-w-md">
            <ProfileCard />
        </div>
    </div>
  );
}