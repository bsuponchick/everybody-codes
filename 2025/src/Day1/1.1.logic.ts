export const determineNextIndex = (currentIndex: number, maxIndex: number, step: number): number => {
    if (step === 0) {
        return currentIndex;
    } else if (step > 0) {
        if (currentIndex + step > maxIndex) {
            return maxIndex;
        } else {
            return currentIndex + step;
        }
    } else {
        if (currentIndex + step < 0) {
            return 0;
        } else {
            return currentIndex + step;
        }
    }
}