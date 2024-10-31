// useVisibilityChange.js
import { ref } from 'vue';
const isTabVisible = ref(true);

function useVisibilityChange() {

    const handleVisibilityChange = (e) => {

        isTabVisible.value = document.visibilityState === 'visible';
    };

    const setupVisibilityChange = () => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
    };

    const cleanupVisibilityChange = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    return {
        isTabVisible,
        setupVisibilityChange,
        cleanupVisibilityChange
    };
}

export default useVisibilityChange