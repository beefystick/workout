import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import * as profileApi from "../../api/profileApi";
import * as authApi from "../../api/authApi";
import { timestampToString } from "../../utils/helpers";
import { updateWeightUnit } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const weightUnit = useSelector((state) => state.auth.weightUnit);
  const profileData = queryClient.getQueryData("profile");

  const updateProfileMutation = useMutation(profileApi.updateProfile, {
    onSuccess: (data) => {
      const weightSystem = data.weight_system;
      dispatch(updateWeightUnit(weightSystem));
      queryClient.invalidateQueries("profile");
      toast.success(`Weight unit: ${weightSystem} is saved!`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Could not update weight unit system!");
    },
  });

  const handleWeightUnitChange = (value) => {
    const payload = { weight_system: value };
    updateProfileMutation.mutate(payload);
  };

  const logoutMutation = useMutation(authApi.blacklist, {
    onSettled: () => {
      dispatch({ type: "CLEAR_SESSION" });
    },
  });

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ maxWidth: "500px" }} className="shadow-sm">
        <Card.Body className="text-center">
          <h2 className="mb-4">My Profile</h2>
          <p><strong>Email:</strong> {profileData?.email}</p>
          <p><strong>Username:</strong> {profileData?.username}</p>
          <p>
            <strong>Weight unit:</strong>
            <ToggleButtonGroup
              name="metric-system"
              type="radio"
              value={weightUnit}
              size="sm"
              className="mx-1 d-block mt-2"
              onChange={handleWeightUnitChange}
            >
              <ToggleButton
                id="btn-kg"
                variant={weightUnit === "kg" ? "primary" : "outline-primary"}
                value="kg"
              >
                Metric (kg)
              </ToggleButton>
              <ToggleButton
                id="btn-lbs"
                variant={weightUnit === "lbs" ? "primary" : "outline-primary"}
                value="lbs"
              >
                Imperial (lbs)
              </ToggleButton>
            </ToggleButtonGroup>
          </p>
          <p><strong>Account created on:</strong> {timestampToString(profileData?.created)}</p>
          <Button
            variant="danger"
            size="lg"
            className="mt-4"
            onClick={() => logoutMutation.mutate()}
          >
            Log out
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
