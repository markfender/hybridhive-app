"use client";

export default function Start() {
  return (
    <>
      <h1>Home</h1>

      <div
        className="flex flex-col items-start mt-2 lg:ml-4"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <div className="mb-1">
          <h6>Search network</h6>
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

        <h3 className=" hidden">Added networks</h3>
        <div id="searchResults" className="bg-white shadow"></div>
      </div>
    </>
  );
}
