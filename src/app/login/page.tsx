import Header from "../components/Header";

export default function Login() {
  return (
    <div>
      <Header />
      <div>
        <div className="flex h-screen p-8">
          <div className="w-1/3"></div>
          <div className="w-2/3 bg-gray-200 rounded-lg flex justify-center py-16">
            <div className="text-4xl">Gabung sekarang dalam komunitas berbudaya</div>
          </div>
        </div>
      </div>
    </div>
  );
}
