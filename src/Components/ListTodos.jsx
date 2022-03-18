import React from 'react'
import { Button, Card, Modal, Row } from 'react-bootstrap'
import { TodoForm} from './TodoForm'

export const ListTodos = () => {
  const [todos, setTodos] = React.useState([])
  const [idToDelete, setIdToDelete] = React.useState()
  const [refresh, setRefresh] = React.useState([])
  const [showConfirm, setShowConfirm] = React.useState(false)

  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:3000/todo/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setRefresh(!refresh)
    }
  }

  React.useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/todo/all', {
        method: 'GET'
      })
      const fetchedTodos = await res.json()
      setTodos(fetchedTodos)
    })()
  }, [refresh])

  return (
    <>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>This Todo going to be deleted</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
              deleteTodo(idToDelete)
              setShowConfirm(false)
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <TodoForm callback={setRefresh} callbackValue={refresh} />
      {todos.map(e => {
        return <Card key={e.id} className="my-3 container">
        <Card.Body>
          <Row>
            <Card.Title className="col-10 align-middle">
              {e.name}
            </Card.Title>
            <Button variant="outline-danger" className="col-2" onClick={() => {
                setIdToDelete(e.id)
                setShowConfirm(true)
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
              </svg> Delete
            </Button>
          </Row>
        </Card.Body>
        </Card>
      })}
    </>
  )
}
