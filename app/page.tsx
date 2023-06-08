"use client"

export default function Start() {
  return (
    <>
      <h1>HybridHive</h1>
      <p className="mb-[15px]">a protocol to combine the benefits of single and multi-currency systems</p>
      <div className="max-w-md mx-auto">
        <h2>Search network</h2>
        <div className="mb-1">
            <input type="text" id="searchInput" className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="Enter your search query" />
        </div>
        <div className="mb-4">
            <button id="searchButton" className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white">Check network</button>
        </div>

        <h2>Added networks</h2>
        <div id="searchResults" className="bg-white shadow">
        </div>
      </div>
    </>
  )
}
