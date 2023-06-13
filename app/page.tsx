"use client";

export default function Start() {
  return (
    <>
      <div className="max-w-md mx-auto">
        <h6>Search network</h6>
        <div className="mb-1">
          <input
            type="text"
            id="searchInput"
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Enter your search query"
          />
        </div>
        <div className="mb-4">
          <button
            id="searchButton"
            className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Check network
          </button>
        </div>

        <h3>Added networks</h3>
        <div id="searchResults" className="bg-white shadow"></div>
      </div>
    </>
  );
}
