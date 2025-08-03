import DiscoverTalent from "@/components/discover";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
            <DiscoverTalent />
        </div>
    </div>
  );
}