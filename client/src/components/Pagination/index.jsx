import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Pagination({ root, divider }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageURL = queryParams.get('page');

    // Convert pageURL to a number, default to 1 if it's not a valid number
    const initialPage = isNaN(parseInt(pageURL, 10)) ? 1 : parseInt(pageURL, 10);
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        // Update the URL when the page state changes
        queryParams.set('page', page);
        const newURL = `${location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, null, newURL);
    }, [page, location, queryParams]);

    const handleAddPage = () => {
        if (page + 1 <= divider) {
        setPage(page + 1);
        } else {
        setPage(divider);
        }
    };

    const handleMinusPage = () => {
        if (page - 1 > 0) {
        setPage(page - 1);
        } else {
        setPage(1);
        }
    };

    return (
        <ul className="pagination mx-auto pagination-md">
            <li onClick={handleMinusPage} className={page === 1 ? 'page-item disabled' : 'page-item'}>
                <Link className="page-link" to={`/${root}?page=${page - 1}`}>
                Previous
                </Link>
            </li>
            {Array.from({ length: divider }).map((_, i) => (
                <li key={i} className={page === i + 1 ? 'page-item active' : 'page-item'}>
                <Link onClick={() => setPage(i + 1)} className="page-link" to={`/${root}?page=${i + 1}`}>
                    {i + 1}
                </Link>
                </li>
            ))}
            <li onClick={handleAddPage} className={page === divider ? 'page-item disabled' : 'page-item'}>
                <Link className="page-link" to={`/${root}?page=${page + 1}`}>
                Next
                </Link>
            </li>
        </ul>
  );
}

export default Pagination;
