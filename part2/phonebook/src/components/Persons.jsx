const Persons = (props) => {
    return (
        <ul>
            {props.persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons