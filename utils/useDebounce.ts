export const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
    const timeoutRef = ref<number | null>(null);
    
    return (...args: unknown[]) => {

        if (timeoutRef.value) {
            window.clearTimeout(timeoutRef.value);
        }
        
        timeoutRef.value = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };
}