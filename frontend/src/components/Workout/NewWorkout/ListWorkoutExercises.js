import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddWorkoutExerciseDetails from "./AddWorkoutExerciseDetails";
import { deleteExercise } from "../../../redux/slices/workoutSlice";

const ListWorkoutExercises = () => {
    const exercises = useSelector((state) => state.workout.exercises);
    const dispatch = useDispatch();

    return (
        <div className="list-workout-exercises-scroll-container mt-2">
            <h4 className="mb-3">Performed Exercises:</h4>
            {exercises?.map((exercise, index) =>
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>{exercise.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Equipment: {exercise.equipment}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Target: {exercise.target}</Card.Subtitle>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="danger"
                                    onClick={() => dispatch(deleteExercise(index))}
                                >
                                    Remove Exercise
                                </Button>
                            </Col>
                        </Row>
                        <AddWorkoutExerciseDetails exercise={exercise} exerciseIndex={index}/>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default ListWorkoutExercises;
