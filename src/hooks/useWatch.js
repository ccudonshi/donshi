import { useEffect } from 'react';

export const useWatch = (label, state) => {
    useEffect(() => {
        console.log(label, state)
    }, [state]);
};