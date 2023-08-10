import './Name.css';

const Name = props => {
    return (
        <div className={"name name" + props.index}>
            <p>{props.name}</p>
        </div>
    )
}

export default Name;