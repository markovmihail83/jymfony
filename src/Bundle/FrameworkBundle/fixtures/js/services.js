/** @global loader */
/** @var {Jymfony.Component.DependencyInjection.Loader.JsFileLoader} loader */

/** @global container */
/** @var {Jymfony.Component.DependencyInjection.Containercontainer} container */

container.setParameter('console.command.ids', [ 'command_1', 'command_2' ]);
container.register('command_1', 'Jymfony.Bundle.FrameworkBundle.Tests.Fixtures.MyCommand')
    .setPublic(true)
;

container.register('command_2', 'Jymfony.Bundle.FrameworkBundle.Tests.Fixtures.MyCommand2')
    .setPublic(true)
;
