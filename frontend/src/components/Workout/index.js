import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NewWorkout from './NewWorkout';
import { startWorkout } from '../../redux/slices/workoutSlice';

const Workout = () => {
    const workoutStarted = useSelector((state) => state.workout.workoutStarted)
    
    const dispatch = useDispatch()
    
    const quotes = [
        "The last three or four reps is what makes the muscle grow. This area of pain divides the champion from someone else who is not a champion. - Arnold Schwarzenegger",
        "Don't count the days, make the days count. - Muhammad Ali",
        "Fitness is not about being better than someone else. It’s about being better than you used to be. - Khloe Kardashian",
        "Exercise is therapy. - Zac Efron",
        "The difference between the impossible and the possible lies in a person's determination. - Tommy Lasorda",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "Training gives us an outlet for suppressed energies created by stress and thus tones the spirit just as exercise conditions the body. - Arnold Schwarzenegger",
        "If something stands between you and your success, move it. Never be denied. - Dwayne 'The Rock' Johnson",
        "If you think lifting is dangerous, try being weak. Being weak is dangerous. - Bret Contreras",
        "The purpose of training is to tighten up the slack, toughen the body, and polish the spirit. - Morihei Ueshiba",
        "The only bad workout is the one that didn’t happen. - Anonymous",
        "Sweat is just fat crying. - Anonymous",
        "The body achieves what the mind believes. - Anonymous",
        "The hardest lift of all is lifting your butt off the couch. - Anonymous",
        "Fitness is like a relationship. You can’t cheat and expect it to work. - Anonymous",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    if (workoutStarted) {
        return <NewWorkout/>
    } else {
        return (
            <div className="mt-2 d-flex justify-content-center">
                <Card style={{ width: '30rem', boxShadow: '0px 10px 25px rgba(0,0,0,0.1)' }} className="text-center p-4">
                    <Card.Body>
                        <Card.Title><h3>Ready to log a new workout?</h3></Card.Title>
                        <Card.Subtitle className="mb-4 text-muted">Here's some motivation to get started:</Card.Subtitle>
                        <Card.Text className="mb-4" style={{ fontStyle: 'italic' }}>{randomQuote}</Card.Text>
                        <Button variant="primary" size="lg" onClick={() => dispatch(startWorkout())}>Log a new workout!</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Workout;
