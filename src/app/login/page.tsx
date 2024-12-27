import Header from "../components/Header";

export default function Login() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex h-screen p-8 items-center bg-red-500">
        <div className="w-1/3"></div>
        <div className="w-2/3 bg-gray-200 rounded-lg flex justify-center py-16">
          <div className="text-4xl font-inter">
            Gabung sekarang dalam komunitas berbudaya
          </div>
        </div>
      </div>
    </div>
  );
}
