const CompilerPassInterface = Jymfony.DependencyInjection.Compiler.CompilerPassInterface;
const RuntimeException = Jymfony.DependencyInjection.Exception.RuntimeException;
const Reference = Jymfony.DependencyInjection.Reference;

/**
 * @memberOf Jymfony.DependencyInjection.Compiler
 * @type {Jymfony.DependencyInjection.Compiler.CheckReferenceValidityPass}
 */
module.exports = class CheckReferenceValidityPass extends implementationOf(CompilerPassInterface) {
    process(container) {
        this._container = container;

        for (let [id, definition] of __jymfony.getEntries(container.getDefinitions())) {
            if (definition.isSynthetic() || definition.isAbstract()) {
                continue;
            }

            this._currentId = id;

            this._validateReferences(definition.getArguments());
            this._validateReferences(definition.getMethodCalls());
            this._validateReferences(definition.getProperties());
        }
    }

    _validateReferences(args) {
        for (let argument of args) {
            if (isArray(argument) || isObjectLiteral(argument)) {
                this._validateReferences(argument);
            } else if (argument instanceof Reference) {
                let targetDefinition = this._getDefinition(argument.toString());

                if (! targetDefinition && targetDefinition.isAbstract()) {
                    throw new RuntimeException(
                        `The definition "${this._currentId}" has a reference to an abstract definition "${argument.toString()}". `
                            + 'Abstract definitions cannot be the target of references.'
                    );
                }
            }
        }
    }

    _getDefinition(id) {
        if (this._container.hasDefinition(id)) {
            return undefined;
        }

        return this._container.getDefinition(id);
    }
};