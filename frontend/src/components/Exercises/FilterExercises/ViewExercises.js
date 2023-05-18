import ListGroup from 'react-bootstrap/ListGroup';

const ViewExercises = ({ exercises }) => {
  return (
    <ListGroup variant="flush" className="view-scroll-container">
      {exercises?.map((exercise) => (
        <ListGroup.Item key={exercise.id}>
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
                <p>Targets: {exercise.target}</p>
               </span>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ViewExercises;
