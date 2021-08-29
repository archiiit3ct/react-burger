import React, {FC, ReactNode, useEffect} from "react";
import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from '../../services/hooks';
import {refresh} from '../../services/actions/auth';

interface iProtectedRouteAuth {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const ProtectedRouteAuth: FC<iProtectedRouteAuth> = ({
                                                                children,
                                                                ...rest
                                                            }) => {
    const dispatch = useDispatch();
    const hasToken = localStorage.getItem('refreshToken');
    const {name} = useSelector((store) => store.auth);
    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);
    const render = ({location}: { location: ReactNode }) => {
        if (name || hasToken) {
            return children;
        }
        return (
            <Redirect to={{pathname: '/login', state: {target: location}}}/>
        );
    };
    return <Route {...rest} render={render}/>;
};

const getNextPage = (
    location: { state: { target?: string } },
    history: ReactNode
) => {
    let result;

    if (location && location.state?.target) {
        result = location.state.target;
        delete location.state.target;
    } else {
        result = '/';
    }

    return result;
};

export const ProtectedRouteUnAuth: FC<iProtectedRouteAuth> = ({
                                                                  children,
                                                                  ...rest
                                                              }) => {
    const {name} = useSelector((store) => store.auth);
    const render = ({
                        location,
                        history,
                    }: {
        location: { state: { target?: string } };
        history: ReactNode;
    }) => {
        if (!name) {
            return children;
        }

        return <Redirect to={getNextPage(location, history)}/>;
    };

    return <Route {...rest} render={render}/>;
};
