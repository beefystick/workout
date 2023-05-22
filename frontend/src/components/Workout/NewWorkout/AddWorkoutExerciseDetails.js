import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { addExerciseDetails, deleteExerciseDetails, updateExerciseDetails } from "../../../redux/slices/workoutSlice";


const AddWorkoutExerciseDetails = ({exercise, exerciseIndex}) => {
    const dispatch = useDispatch();
    const weightUnit = useSelector((state) => state.auth.weightUnit)

    const handleInputChange = (index, event) => {
        if (event.target.validity.valid) {
            dispatch(updateExerciseDetails({
                exerciseIndex,
                index,
                name: event.target.name,
                value: parseInt(event.target.value)
            }))
        }
    }

    return (
        <Form>
            {exercise["workout_exercise_details"].map((input, index) =>
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} xs={3} className="flex-grow-2">
                                <Form.Label>Sets</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    name="sets"
                                    value={input.sets}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} xs={3} className="flex-grow-2">
                                <Form.Label>Reps</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="1000"
                                    step="1"
                                    name="reps"
                                    value={input.reps}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} xs={3} className="flex-grow-2">
                                <Form.Label>Weight ({weightUnit})</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="1500"
                                    step="1"
                                    name="weight"
                                    value={input.weight}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} xs={1} className="d-flex justify-content-center align-items-start pt-2">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => dispatch(deleteExerciseDetails({exerciseIndex, index}))}
                                >
                                    <i className="fa fa-times" aria-hidden="true"/>
                                </Button>
                            </Form.Group>
                        </Row>
                    </Card.Body>
                </Card>
            )}
            <Button
                variant="outline-dark"
                size="lg"
                block
                className="mt-2"
                onClick={() => dispatch(addExerciseDetails(exerciseIndex))}
            >
                + Add Set
            </Button>
        </Form>
    );
};

export default AddWorkoutExerciseDetails;
