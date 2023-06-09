import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import AddExercisesModal from "./AddExercisesModal";
import ListWorkoutExercises from "./ListWorkoutExercises";
import {timestampToString} from "../../../utils/helpers";
import {clearWorkout} from "../../../redux/slices/workoutSlice";
import * as api from "../../../api/workoutApi";


const NewWorkout = () => {
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const exercises = useSelector((state) => state.workout.exercises);
    const dispatch = useDispatch();

    const createWorkoutMutation = useMutation(api.createWorkout, {
        onSuccess: () => {
            dispatch(clearWorkout());
            toast.success("Saved a new workout!");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Could not save a new workout!");
        },
    });

    const handleSaveWorkout = () => {
        const payload = {
            "status": "Finished",
            "workout_exercises": exercises
        }
        console.log("Payload: ", JSON.stringify(payload));
        createWorkoutMutation.mutate(payload);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '30rem' }} className="p-4 shadow-sm">
                <Card.Body>
                    <h2 className="text-center">Log a new workout</h2>
                    <div className="text-secondary">
                        <strong>Status:</strong> Started on {timestampToString(new Date())}
                    </div>

                    <ListWorkoutExercises/>

                    <div className="d-grid gap-2 mt-4">
                        <Button variant="primary" onClick={() => setShowExerciseModal(true)}>Add Exercises</Button>
                        <Button variant="success" type="submit" onClick={handleSaveWorkout}>
                            {createWorkoutMutation.isLoading ? <Spinner animation="border" size="sm"/> : "Save Workout"}
                        </Button>
                        <Button variant="danger" onClick={() => dispatch(clearWorkout())}>Cancel Workout</Button>
                    </div>

                    <AddExercisesModal
                        show={showExerciseModal}
                        onHide={() => setShowExerciseModal(false)}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default NewWorkout;