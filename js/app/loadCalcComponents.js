/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 14/02/13
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */
requirejs(['CreationMethods', 'HelperMethods', 'Calculator'],
    function (CreationMethods, HelperMethods, Calculator) {
        $(document).ready(function() {
            var options = {
                lengthField: 9,
                creationMethods: CreationMethods,
                helperMethods: HelperMethods
            }
            $('.calculator').calculator(options)
        })
    })