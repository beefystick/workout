// Imports
import axiosInstance from "./instances/axiosInstance";
import {apiRoutes} from "../utils/routes";

// Export API requests
export const getExercises = () => axiosInstance.get(apiRoutes.exercises).then(response => response.data);
export const createExercise = (data) => axiosInstance.post(apiRoutes.exercises, data).then(response => response.data);