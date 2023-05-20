import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const SelectExercises = ({ exercises, handleSelect }) => {
  return (
    <Form onChange={handleSelect}>
      <ListGroup variant="flush" className="select-scroll-container">
        {exercises?.map((exercise) => (
          <ListGroup.Item key={exercise.id} className="exercise-item">
            <Form.Group className="exercise-checkbox">
              <Form.Check id={exercise.id}>
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>
                  <div className="exercise-gif">
                    <div className="d-flex align-items-center">
                      {exercise.gifUrl && (
                        <div className="mr-3">
                          <img src={exercise.gifUrl} alt={exercise.name} width="150" height="150" />
                        </div>
                      )}
                    <div>
                      <h6 className="mb-0" style={{ fontSize: "20px" }} >{exercise.name}</h6>
                      <span className="text-muted">
                        <p>Equipment: {exercise.equipment}</p>
                        < p>Targets: {exercise.target}</p>
                      </span>
                    </div>
                    </div>
                  </div>
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Form>
  );
};

export default SelectExercises;
