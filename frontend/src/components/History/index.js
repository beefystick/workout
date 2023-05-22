import ListGroup from "react-bootstrap/ListGroup";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import WorkoutExercise from "./WorkoutExercise";
import * as api from "../../api/workoutApi";
import {timestampToString} from "../../utils/helpers";
import {Link} from "react-router-dom";
import {pageRoutes} from "../../utils/routes";

const WorkoutHistory = () => {
    const {data} = useQuery('workout', api.getWorkoutHistory);
    const queryClient = useQueryClient()

    const deleteWorkoutMutation = useMutation(api.deleteWorkout, {
        onError: (error) => {
            console.error(error);
            toast.error("Could not delete workout!");
        },
        onSuccess: () => {
            toast.info("Workout has been deleted!");
            queryClient.invalidateQueries("workout");
        },
    })

    return (
        <div className="mt-2">
            <h2 className="text-center">My Workout History</h2>

            {data?.length === 0 &&
                <div className="text-center mt-5">
                    <h5>You don't have any saved workouts!</h5>
                    <div className="fs-5 mt-3">Start your first <Link to={pageRoutes.workout}>workout</Link>!</div>
                </div>
            }

            {data?.map(workout =>
                <Card className="mb-4 shadow-sm" key={workout.id}>
                    <Card.Header as="h5">
                        <Row>
                            <Col>
                                Workout: <Badge bg="success">{workout.status}</Badge>
                            </Col>
                            <Col>
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    onClick={() => deleteWorkoutMutation.mutate(workout.id)}>
                                    <i className="fa fa-trash" aria-hidden="true"/>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Started on {timestampToString(workout.created)}
                        </Card.Subtitle>
                        <WorkoutExercise exercises={workout?.["workout_exercises"]}/>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default WorkoutHistory;
