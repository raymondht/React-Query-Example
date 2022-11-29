import { Alert, CircularProgress, Grid } from "@mui/material";
import React from "react";
import useUsers from '../utils/react-query/query/users/useUsers';
import UserCard from "../components/UserCard";

const Users = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorLoadingUsers,
    isRefetchError
  } = useUsers();
  const loaderView = isLoadingUsers && <CircularProgress className="fixed-center" />;
  const errorView = errorLoadingUsers && <Alert severity="error">Oops. There was an error fetching the user. {errorLoadingUsers.errorMessage}</Alert>

  const userListView = users && (
    users.map(user => {
      return <Grid item key={user.id}>
        <UserCard
          id={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      </Grid>
    })
  );

  return (
    <>
      {!isRefetchError && errorView}
      {loaderView}
      <Grid container direction="row" justifyContent="center" spacing={5}>
        {userListView}
      </Grid>

    </>
  );
};

export default Users;
