const MultipleResolvesException = Jymfony.Component.Debug.Exception.MultipleResolvesException;
const UnhandledRejectionException = Jymfony.Component.Debug.Exception.UnhandledRejectionException;

/**
 * @memberOf Jymfony.Component.Debug
 */
class Debug {
    static enable() {
        __jymfony.autoload.debug = true;

        process.on('unhandledRejection', (reason, p) => {
            throw new UnhandledRejectionException(p, reason instanceof Error ? reason : undefined);
        });

        process.on('multipleResolves', (type, promise, reason) => {
            throw new MultipleResolvesException(type, promise, reason);
        });
    }
}

module.exports = Debug;
