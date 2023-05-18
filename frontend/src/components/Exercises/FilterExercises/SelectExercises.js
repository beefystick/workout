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
                    <div className="exercise-gif">
                      <img src={exercise.gifUrl} alt="Exercise GIF" />
                    </div>
                    <div className="exercise-name">
                      <h6 style={{ fontSize: "20px" }}>{exercise.name}</h6>
                      <p className="exercise-info">
                        Equipment: {exercise.equipment} <br />
                        Target: {exercise.target}
                      </p>
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
