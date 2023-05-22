import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {Formik} from "formik";
import * as yup from "yup";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import * as api from "../../api/authApi";
import {login} from "../../redux/slices/authSlice";
import {pageRoutes} from "../../utils/routes";


const schema = yup.object().shape({
    email: yup.string().label("Email").email().required(),
    password: yup.string().label("Password").required().min(8).max(32),
});


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const location = useLocation();
    const redirectPath = location.state?.path || pageRoutes.workout;

    const loginMutation = useMutation(api.login, {
        onMutate: () => {
            setFormSubmitting(true);
        },
        onSuccess: (data) => {
            dispatch(login(data));
            navigate(redirectPath);
        },
        onError: () => {
            setFormSubmitting(false);
            toast.error("Could not log in!")
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '30rem' }} className="p-4 shadow-sm">
                <Card.Body>
                    <Stack gap={3}>
                        <h2 className="text-center">Log In</h2>
                        <Formik
                            validationSchema={schema}
                            onSubmit={(data) => loginMutation.mutate(data)}
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                        >
                            {({handleSubmit, handleChange, values, touched, errors}) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="signinEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            autoComplete="on"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="signinPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="on"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && errors.password}
                                            />
                                            <InputGroup.Text>
                                                <i
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className={
                                                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                                                    }
                                                />
                                            </InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button variant="primary" size="lg" type="submit" disabled={formSubmitting}>
                                            {formSubmitting ? <Spinner animation="border" size="sm"/> : "Log in"}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="text-center">
                            Don't have an account? <Link to={pageRoutes.register}>Register</Link>
                        </div>
                    </Stack>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
