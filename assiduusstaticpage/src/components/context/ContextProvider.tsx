import React, { useState, createContext, useEffect } from 'react'

interface IProps {
    children: React.ReactNode
}

interface PageContext {
    screenHeight: any;
    screenWidth: any;
    shuffleArray: (array: any) => void
}

export const PageContext = createContext<PageContext>({} as PageContext);

const ContextProvider = ({ children }: IProps) => {

    const [windowSize, setWindowSize] = useState(getWindowSize());
    let screenHeight;
    let screenWidth;

    function shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

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
        shuffleArray
    }

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export default ContextProvider;
