import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Total = ({sum}) => <b>Number of exercises {sum}</b>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part} />)

const Course = ({course}) => {
  const total = course.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  )
}

export default Course
