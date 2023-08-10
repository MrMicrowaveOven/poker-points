import './Table.css';

const Table = (props) => {
    return (
        <div>
            <div className="table">
                {props.children}
            </div>
        </div>
    )
}

export default Table