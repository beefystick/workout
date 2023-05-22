import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExerciseDropdown from "./ExerciseDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from 'react-bootstrap/Card';
import * as exerciseApi from "../../../api/exerciseApi";

const ANY_BODY_PART = "All target muscles";
const ANY_EQUIPMENT = "All Equipment";

const FilterExercises = ({RenderExercises, handleSelect}) => {
    const [visibleExercises, setVisibleExercises] = useState(null);
    const [input, setInput] = useState("");
    const [selectedTarget, setselectedTarget] = useState(ANY_BODY_PART);
    const [selectedEquipment, setSelectedEquipment] = useState(ANY_EQUIPMENT);

    const {data: exercises} = useQuery('exercise', exerciseApi.getExercises);

    const queryClient = useQueryClient();
    
    const exerciseData = queryClient.getQueryData("exercise");
    
    const targets = exerciseData ? Array.from(new Set(exerciseData.map((exercise) => exercise.target))) : [];
    const equipment = exerciseData ? Array.from(new Set(exerciseData.map((exercise) => exercise.equipment))) : [];

    useEffect(() => {
        let filteredExercises = exercises?.filter(obj => obj.name.toLowerCase().includes(input.toLowerCase()))
        if (selectedTarget !== ANY_BODY_PART)
            filteredExercises = filteredExercises.filter(obj => obj.target === selectedTarget);
        if (selectedEquipment !== ANY_EQUIPMENT)
            filteredExercises = filteredExercises.filter(obj => obj.equipment === selectedEquipment);
        setVisibleExercises(filteredExercises);
    }, [exercises, input, selectedTarget, selectedEquipment]);

    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-2" controlId="search-exercises">
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fas fa-search"/>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search all exercises"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>
                <Row>
                    <Col>
                        <ExerciseDropdown
                            dropdownId="dropdown-body-part"
                            label={ANY_BODY_PART}
                            items={targets}
                            selected={selectedTarget}
                            onSelect={setselectedTarget}
                        />
                    </Col>
                    <Col>
                        <ExerciseDropdown
                            dropdownId="dropdown-equipment"
                            label={ANY_EQUIPMENT}
                            items={equipment}
                            selected={selectedEquipment}
                            onSelect={setSelectedEquipment}
                        />
                    </Col>
                </Row>
                <RenderExercises exercises={visibleExercises} handleSelect={handleSelect}/>
            </Card.Body>
        </Card>
    );
};

export default FilterExercises;