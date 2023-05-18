import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import FilterExercises from "./FilterExercises";
import ViewExercises from "./FilterExercises/ViewExercises";

const Exercises = () => {
    return (
        <div className="mt-2">
            <Stack gap={2}>
                <Row>
                    <Col>
                        <h2>Exercises</h2>
                    </Col>
                </Row>
                <FilterExercises RenderExercises={ViewExercises}/>
            </Stack>
        </div>
    );
};

export default Exercises;
