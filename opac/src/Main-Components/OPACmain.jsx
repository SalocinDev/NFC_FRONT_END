// login-ui/src/Main-Components/OPACPage.jsx
import React, { useState } from "react";
import { OPACResult1, OPACSearch1, BookDetail1 } from '../Components';

export default function OPACPage() {
  const [activeView, setActiveView] = useState("search"); // "search" | "results" | "detail"
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("keyword");
  const [selectedBookId, setSelectedBookId] = useState(null);

  // when search is submitted
  const handleSearch = (newQuery, newType) => {
    setQuery(newQuery);
    setSearchType(newType);
    setActiveView("results");
  };

  // when a book is selected
  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    setActiveView("detail");
  };

  // go back to previous section
  const handleBack = () => {
    if (activeView === "detail") setActiveView("results");
    else setActiveView("search");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {activeView === "search" && (
        <OPACSearch1 onSearch={handleSearch} />
      )}

      {activeView === "results" && (
        <OPACResult1
          query={query}
          type={searchType}
          onBookClick={handleBookClick}
          onBack={handleBack}
          onNewSearch={handleSearch}
        />
      )}

      {activeView === "detail" && (
        <BookDetail1 bookId={selectedBookId} onBack={handleBack} />
      )}
    </div>
  );
}
