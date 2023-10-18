
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

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <b>
            total of {total} exercises
        </b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content key={course.id} parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course