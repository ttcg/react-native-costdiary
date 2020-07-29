import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-native-root-toast';

import { selectToaster, hideToast } from '../store/toasterReducer'

const Toaster = () => {

    const { message } = useSelector(selectToaster);
    const dispatch = useDispatch();

    return (
        <>
            {message &&
                <ToastContainer
                    visible={true}
                    shadow={true}
                    animation={true}
                    hideOnPress={true}
                    onHidden={() => {
                        dispatch(hideToast());
                    }}>
                    {message}
                </ToastContainer>
            }
        </>
    );
}

export default Toaster;