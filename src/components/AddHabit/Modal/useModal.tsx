import {useState} from "react";

export const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => {
        setIsVisible(!isVisible);
    };

    return {
        isVisible,
        toggle,
    };
};
