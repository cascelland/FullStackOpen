
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h1>
            {name}
        </h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ exercises }) => (<b>total of {exercises.reduce((total, amount) => total + amount)} exercises</b>)

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content key={course.id} parts={course.parts} />
            <Total exercises={course.parts.map(part => part.exercises)} />
        </div>
    )
}

export default Course