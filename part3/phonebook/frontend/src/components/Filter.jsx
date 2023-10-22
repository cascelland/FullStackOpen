const Filter = (props) => {
    return (
        <div>
            filter shown with <input
                value={props.searchFilter}
                onChange={props.handleSearchFilter}
            />
        </div>
    )
}

export default Filter