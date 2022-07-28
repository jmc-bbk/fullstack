const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.cnt_exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // Extract exercises as array
  const exercises = course.parts.map(part => part.exercises)
  // Sum exercises using reduce
  const cnt_exercises = exercises.reduce((a, b) => a + b, 0) 

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total cnt_exercises={cnt_exercises} />
    </div>
  )
}

export default App
