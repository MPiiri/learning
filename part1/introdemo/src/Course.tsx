const Course = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]
    return (
        <div>
            {courses.map(course =>
                <>
                    <Header key={course.id} course={course.name} />
                    <Content key={course.id} parts={course.parts} />
                    <Total key={course.id} parts={course.parts} />
                </>
            )}
        </div>
    )
}
const Header = ({ course }: { course: string }) => {
    return (<h1>{course}</h1>)
}
const Part = ({ exercises, part }: { exercises: number, part: string }) => (
    <p>
        {part} {exercises}
    </p>
)
const Content = ({ parts }: { parts: { id: number, name: string, exercises: number }[] }) => {

    return (
        <>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </>
    )

}
const Total = ({ parts }: { parts: { name: string, exercises: number }[] }) => {
    const sum = parts.reduce((a, b) => a + b.exercises, 0)
    return (
        <p>
            Number of exercises {sum}
        </p>)
}
export default Course