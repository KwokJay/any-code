import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Constants for font size scaling
const STORAGE_KEY_SESSION = 'any-code-session-font-scale';
const STORAGE_KEY_UI = 'any-code-ui-font-scale';
const DEFAULT_SCALE = 100;
const MIN_SCALE = 50;
const MAX_SCALE = 150;

interface FontContextType {
    sessionFontScale: number;
    uiFontScale: number;
    setSessionFontScale: (scale: number) => void;
    setUiFontScale: (scale: number) => void;
    resetFontScales: () => void;
    minScale: number;
    maxScale: number;
    defaultScale: number;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

/**
 * Apply font scale to CSS variables on the document root
 */
const applyFontScale = (sessionScale: number, uiScale: number) => {
    const root = document.documentElement;
    const sessionValue = String(sessionScale / 100);
    const uiValue = String(uiScale / 100);

    root.style.setProperty('--session-font-scale', sessionValue);
    root.style.setProperty('--ui-font-scale', uiValue);

    console.log('[FontContext] Applied font scales:', {
        sessionScale,
        uiScale,
        '--session-font-scale': sessionValue,
        '--ui-font-scale': uiValue
    });
};

/**
 * Load saved font scale from localStorage
 */
const loadSavedScale = (key: string): number => {
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            const value = parseInt(saved, 10);
            if (!isNaN(value) && value >= MIN_SCALE && value <= MAX_SCALE) {
                return value;
            }
        }
    } catch (error) {
        console.error('Failed to load font scale from localStorage:', error);
    }
    return DEFAULT_SCALE;
};

/**
 * Save font scale to localStorage
 */
const saveScale = (key: string, value: number) => {
    try {
        localStorage.setItem(key, String(value));
    } catch (error) {
        console.error('Failed to save font scale to localStorage:', error);
    }
};

interface FontProviderProps {
    children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
    const [sessionFontScale, setSessionFontScaleState] = useState<number>(() =>
        loadSavedScale(STORAGE_KEY_SESSION)
    );
    const [uiFontScale, setUiFontScaleState] = useState<number>(() =>
        loadSavedScale(STORAGE_KEY_UI)
    );

    // Apply font scales on mount and when they change
    useEffect(() => {
        applyFontScale(sessionFontScale, uiFontScale);
    }, [sessionFontScale, uiFontScale]);

    const setSessionFontScale = useCallback((scale: number) => {
        const clampedScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
        setSessionFontScaleState(clampedScale);
        saveScale(STORAGE_KEY_SESSION, clampedScale);
    }, []);

    const setUiFontScale = useCallback((scale: number) => {
        const clampedScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
        setUiFontScaleState(clampedScale);
        saveScale(STORAGE_KEY_UI, clampedScale);
    }, []);

    const resetFontScales = useCallback(() => {
        setSessionFontScaleState(DEFAULT_SCALE);
        setUiFontScaleState(DEFAULT_SCALE);
        saveScale(STORAGE_KEY_SESSION, DEFAULT_SCALE);
        saveScale(STORAGE_KEY_UI, DEFAULT_SCALE);
    }, []);

    const value: FontContextType = {
        sessionFontScale,
        uiFontScale,
        setSessionFontScale,
        setUiFontScale,
        resetFontScales,
        minScale: MIN_SCALE,
        maxScale: MAX_SCALE,
        defaultScale: DEFAULT_SCALE,
    };

    return (
        <FontContext.Provider value={value}>
            {children}
        </FontContext.Provider>
    );
};

/**
 * Hook to access font size settings
 */
export const useFont = (): FontContextType => {
    const context = useContext(FontContext);
    if (context === undefined) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};

export { MIN_SCALE, MAX_SCALE, DEFAULT_SCALE };
