import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {Formik} from "formik";
import {toast} from "react-toastify";
import * as yup from "yup";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import * as api from "../../api/authApi";
import {login} from "../../redux/slices/authSlice";
import {pageRoutes} from "../../utils/routes";


const schema = yup.object().shape({
    email: yup.string().label("Email").email().required(),
    username: yup
        .string()
        .label("Username")
        .required()
        .min(3)
        .max(32)
        .matches(/[a-zA-Z]/, "Username can only contain Latin letters."),

    password: yup
        .string()
        .label("Password")
        .required()
        .min(8)
        .max(32)
        .matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Password can only contain Latin letters, numbers, and underscores. "),
});


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const registerMutation = useMutation(api.register, {
        onSuccess: (data) => {
            dispatch(login(data));
            navigate(pageRoutes.workout);
        },
        onError: () => {
            toast.error("Could not register!")
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '30rem' }} className="p-4 shadow-sm">
                <Card.Body>
                    <Stack gap={3}>
                        <h2 className="text-center">Register</h2>

                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => registerMutation.mutate(values)}
                            initialValues={{username: "", email: "", password: ""}}
                        >
                            {({handleSubmit, handleChange, values, touched, errors}) => (
                                <Form noValidate onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3" controlId="signupEmail">
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

                                    <Form.Group className="mb-3" controlId="signupUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            autoComplete="off"
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={touched.username && errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="signupPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="off"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && errors.password}
                                            />
                                            <InputGroup.Text>
                                                <i
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                                                />
                                            </InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button variant="primary" size="lg" type="submit">
                                            {registerMutation.isLoading ? <Spinner animation="border" size="sm"/> : "Register"}
                                        </Button>
                                    </div>

                                </Form>)}
                        </Formik>

                        <div className="text-center">
                            Already a user? <Link to={pageRoutes.login}>Log In</Link>
                        </div>

                    </Stack>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
