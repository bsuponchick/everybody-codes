interface PopulateCacheFromStampsParams {
    stamps: number[];
    rootValue: number;
    maxValue: number;
    cache: Map<number, number>;
}

interface QueuedItem {
    value: number;
    depth: number;
}

export const populateCacheFromStampsParams = (params: PopulateCacheFromStampsParams): void => {
    const { stamps, rootValue, maxValue, cache } = params;
    const queue: QueuedItem[] = [{
        value: rootValue,
        depth: 1
    }];

    while (queue.length > 0) {
        const current = queue.shift();

        for (const stamp of stamps) {
            const newNodeValue = current.value + stamp;
            const depth = current.depth + 1;

            if (!cache.has(newNodeValue)) {
                cache.set(newNodeValue, depth);

                if (newNodeValue <= maxValue) {
                    queue.push({
                        value: newNodeValue,
                        depth: depth
                    });
                }
            } else if (cache.has(newNodeValue) && cache.get(newNodeValue) > depth) {
                cache.set(newNodeValue, depth);
            }
        }
    }
}

interface GenerateCacheFromStampsParams {
    stamps: number[];
    maxValue: number;
}

export const generateCacheFromStamps = (params: GenerateCacheFromStampsParams): Map<number, number> => {
    const { stamps, maxValue } = params;
    const cache = new Map<number, number>();

    for (const stamp of stamps) {
        populateCacheFromStampsParams({ stamps, rootValue: stamp, maxValue, cache });
    }
    return cache;
}