const Pagination = ({ page, pages, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const delta = 2; // Number of pages to show around the current page
  
        for (let i = 1; i <= pages; i++) {
            // Show the first, last, current, and surrounding pages
            if (
                i === 1 ||
                i === pages ||
                (i >= page - delta && i <= page + delta)
            ) {
                pageNumbers.push(i);
            } else if (
                i === page - delta - 1 ||
                i === page + delta + 1
            ) {
                // Add a placeholder for skipped pages
                pageNumbers.push("...");
            }
        }
  
        // Remove consecutive duplicates of "..."
        return pageNumbers.filter((item, idx, arr) => item !== "..." || arr[idx - 1] !== "...");
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
        <>
            <div className="flex justify-center">
                <ul className="flex border border-slate-300 rounded overflow-hidden">
                    {pageNumbers.map((number, index) => (
                        <li
                            key={index}
                            className={`px-3 py-1 ${page === number ? "bg-gray-300 font-bold" : ""
                                }`}
                        >
                            {number === "..." ? (
                                <span className="px-2">...</span>
                            ) : (
                                <button onClick={() => onPageChange(number)}>{number}</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center pt-2">
                <input type="text" placeholder="Enter page number here" className="border-slate-200" />
            </div>
        </>
    );
};
  
  export default Pagination;
  