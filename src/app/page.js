import { SearchInput } from "../components/SearchInput/SearchInput";
import { fetchSearchResult } from "../lib/fetchSearchResult";
let loading;
export default async function Home({ searchParams }) {
  const q = searchParams?.q || "";
  const query = q.split(" ");
  const page = searchParams?.page || 1;

  loading = true;
  const searchResult = fetchSearchResult(q.split(" "));
  loading = false;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <SearchInput />
        </div>
        {loading && <div>Loading please wait...</div>}
        <div className="space-y-4">
          {searchResult.map((doc, index) =>
            doc.similarity > 0 ? (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-lg font-extrabold text-gray-800 mb-2">
                  Result {index + 1}
                </div>
                <div className="text-md font-medium text-gray-700">
                  {doc.text.split(" ").map((term, termIndex) =>
                    query.includes(term) ? (
                      <span
                        key={termIndex}
                        className="text-yellow-600 font-semibold"
                      >
                        {term}{" "}
                      </span>
                    ) : (
                      <span key={termIndex} className="text-gray-800">
                        {term}{" "}
                      </span>
                    )
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Similarity:{" "}
                  <span className="font-semibold">{doc.similarity}</span>
                </div>
                <div className="text-sm text-gray-600">
                  File Name:{" "}
                  <span className="font-semibold">{doc.fileName}</span>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
