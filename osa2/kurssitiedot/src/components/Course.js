import React from 'react'

const Header = ({ name }) => {
    return (
        <>
            <h2>{name}</h2>
        </>
    )
}

const Part = ({ part, exe }) => {
    return (
        <>
            <p>
                {part} {exe}
            </p>
        </>
    )
}

const Content = ({ parts }) => {
    const rows = () => parts.map(particle =>
        <Part
            key={particle.id}
            part={particle.name}
            exe={particle.exercises}
        />
    )
    return (
        <>
            {rows()}
        </>
    )
}

const Total = ({ parts }) => {
    const map1 = parts.map(x => x.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var s = map1.reduce(reducer)

    return (
        <>
            <p>Yhteensä {s} tehtävää</p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course