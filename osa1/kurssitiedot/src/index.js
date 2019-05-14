import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.p} {props.e}
            </p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part p={props.parts[0].name} e={props.parts[0].exercises} />
            <Part p={props.parts[1].name} e={props.parts[1].exercises} />
            <Part p={props.parts[2].name} e={props.parts[2].exercises} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Yhteensä {props.parts[0].exercises + props.parts[1].exercises
                + props.parts[2].exercises} tehtävää</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

