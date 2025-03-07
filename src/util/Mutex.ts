export default class Mutex {
    private static originsMutex: { [index: string]: Promise<void>[] } = {
        DEFAULT: [],
        SHARED: [],
    };

    /**
     * Acquire a Mutex by its "origin"
     *
     * Warning ! The origin is really important when you're on the shared repo
     * because it's the only way to differentiate a Mutex from the shared with a Mutex from the repo.
     *
     * If you do not do that, you might have trouble for the repo mutex which will release
     * the mutex when the access layer will release it... which will release when the repo mutex will release... infinite wait.
     *
     * @param origin { MutexOrigin} Please use "SHARED" when you use Mutex in shared repo, and let "DEFAULT" when you're on the repo side
     * @returns Return the unlock Promise to free up this Mutex
     */
    static async acquire(origin: MutexOrigin = "DEFAULT") {
        let release: () => void;
        const next = new Promise<void>((resolve) => {
            release = () => {
                this.originsMutex[origin]!.shift();
                resolve();
            };
        });
        const waiter = (
            this.originsMutex[origin]!.length === 0 ? Promise.resolve() : Mutex.originsMutex[origin]![this.originsMutex[origin]!.length - 1]!
        ).then(() => release);
        Mutex.originsMutex[origin]!.push(next);
        return await waiter;
    }
}

export type MutexOrigin = "DEFAULT" | "SHARED";
