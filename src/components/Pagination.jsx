import proptype from 'prop-types';

Pagination.propTypes = {
    currentPage: proptype.number,
    totalPage: proptype.number,
    setCurrentPage: proptype.func,
    handleChangePage: proptype.func
}

export default function Pagination({ totalPage, handleChangePage, setCurrentPage, currentPage }) {
    function handleClick(e) {
        setCurrentPage(parseInt(e.target.ariaLabel));
        handleChangePage(parseInt(e.target.ariaLabel));
    }
    return (
        <div className="join">
            {Array.from({ length: totalPage }).map((item, index) => {
                return (
                    <button disabled={currentPage === index + 1} key={index} onClick={handleClick} className={currentPage === index + 1 ? "join-item btn btn-primary text-xl" : "join-item btn btn-primary text-xl"} type="radio" name="options" aria-label={index + 1} >{index + 1}</button>)
            })}
        </div>
    )
}