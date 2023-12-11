
import './FilterHeader.css';

const FilterHeader = ({category, selectFilter}) => {
    const filters = ["Unread", "Read", "Favorites"];

    const handleCategorySelect = (e) => {
        if (e.target.nodeName === "BUTTON") {
          selectFilter(e.target.id);
        }
      };

    return(
        <header className="header__container">
            <p>Filter By:</p>
            <div onClick={handleCategorySelect}>
                {filters.map((filter, i) => (
                    <button
                    key={i}
                    id={filter}
                    className={category === filter ? "active" : ""}>
                        {filter}
                    </button>
                ))}
            </div>
        </header>
    )
}

export default FilterHeader;