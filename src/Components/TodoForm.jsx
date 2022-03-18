import React from 'react'
import { Button, Form } from 'react-bootstrap'

export const TodoForm = ({ callback, callbackValue }) => {
  const [todoName, setTodoName] = React.useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!todoName) return alert('Todo need to have a name')
    const res = await fetch('http://localhost:3000/todo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: todoName
      })
    })
    if (res.ok) {
      setTodoName('')
      callback(!callbackValue)
    }
  }

  return (
    <>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className='my-3'>
            <Form.Control type="text" placeholder="New Todo" value={todoName}
              onChange={(e) => {
                setTodoName(e.target.value)
              }
            }/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  )
}
