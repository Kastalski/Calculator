/**
 * Created with JetBrains WebStorm.
 * User: kastalski
 * Date: 13/02/13
 * Time: 14:14
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var options = {
        creationMethods: CreationMethods(),
        helperMethods: HelperMethods()
    }
    $('.calculator').calculator(options)
})