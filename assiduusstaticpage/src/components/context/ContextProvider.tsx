import React, { useState, createContext, useEffect } from 'react'

interface IProps {
    children: React.ReactNode
}

interface PageContext {
    screenHeight: any;
    screenWidth: any;
}

export const PageContext = createContext<PageContext>({} as PageContext);

const ContextProvider = ({ children }: IProps) => {

    const [windowSize, setWindowSize] = useState(getWindowSize());
    let screenHeight;
    let screenWidth;

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }


        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    screenHeight = windowSize.innerHeight;
    screenWidth = windowSize.innerWidth;

    const value = {
        screenHeight,
        screenWidth,
    }

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export default ContextProvider;
