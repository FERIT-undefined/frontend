import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/userActions";

function Zaposlenici(props) {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(props.user));
  }, []);
  console.log(users);
  return <div>
    <div className="row">
    </div>
  </div>;
}

export default Zaposlenici;
