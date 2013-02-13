/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 13/02/13
 * Time: 14:28
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
})
var creationMethods = {}
var helperMethods = {}
// Start the main app logic.
requirejs(['CreationMethods', 'HelperMethods', 'Calculator', 'app/sub'],
    function (CreationMethods, HelperMethods, Calculator, sub) {
        creationMethods = CreationMethods
        helperMethods = HelperMethods
    })