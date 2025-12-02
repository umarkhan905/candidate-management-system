export const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-red-600 text-6xl">Oops!</h1>
        <h2 className="mb-2 font-semibold text-gray-800 text-2xl">
          Something went wrong
        </h2>
        <p className="mb-8 text-gray-600">
          An unexpected error occurred. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};
