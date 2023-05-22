import { Card, ListGroup } from 'react-bootstrap';

const ViewExercises = ({ exercises }) => {
  return (
    <ListGroup variant="flush" className="view-scroll-container">
      {exercises?.map((exercise) => (
        <ListGroup.Item key={exercise.id}>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center">
                {exercise.gifUrl && (
                  <div className="mr-3">
                    <Card.Img variant="top" src={exercise.gifUrl} alt={exercise.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <Card.Title style={{ fontSize: "20px" }} >{exercise.name}</Card.Title>
                  <Card.Text>
                    <p><b>Equipment:</b> {exercise.equipment}</p>
                    <p><b>Targets:</b> {exercise.target}</p>
                  </Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ViewExercises;
