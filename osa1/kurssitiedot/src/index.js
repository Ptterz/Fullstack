import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <p>
                {props.p1} {props.e1}
            </p>
            <p>
                {props.p2} {props.e2}
            </p>
            <p>
                {props.p3} {props.e3}
            </p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Yhteensä {props.e1 + props.e2 + props.e3} tehtävää</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2}
            p3={part3} e3={exercises3} />
            <Total e1={exercises1} e2={exercises2} e3={exercises3} />
        </div>
    )
    
}
ReactDOM.render(<App />, document.getElementById('root'));

