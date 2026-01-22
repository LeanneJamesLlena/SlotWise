import './App.css';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">Tailwind CSS Test</h1>
        <p className="mb-6 text-center text-gray-600">
          If you can see this styled card, Tailwind is working! 🎉
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-100 p-4">
            <p className="font-semibold text-blue-800">Blue Card</p>
          </div>
          <div className="rounded-lg border-l-4 border-green-500 bg-green-100 p-4">
            <p className="font-semibold text-green-800">Green Card</p>
          </div>
          <div className="rounded-lg border-l-4 border-purple-500 bg-purple-100 p-4">
            <p className="font-semibold text-purple-800">Purple Card</p>
          </div>
        </div>
        <button className="mt-6 w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
