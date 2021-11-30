import React from 'react';
import {
    Route
} from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    !isAuthenticated ? (
                        children
                    ) : (
                        <Route
                            to={{
                                pathname: '/home',
                                state: { from: location }
                            }}
                        />
                    ))
            }
        />
    );
}

export default PrivateRoute;