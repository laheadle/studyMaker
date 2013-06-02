// Configuration for require.js optimizer
// to build an optimized app, run
// r.js -o build .js
// then edit app.js to use www-built as the document root:
// app.use(express.static(path.join(__dirname, './www-built')));
{
    appDir: '../www',
    mainConfigFile: '../www/js/common.js',
    baseUrl: './js',
    dir: '../www-built',
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['backbone',
            ]
        },

        //Now set up a build layer for each main layer, but exclude
        //the common one. "exclude" will exclude
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //The "page1" and "page2" modules are **not** the targets of
        //the optimization, because shim config is in play, and
        //shimmed dependencies need to maintain their load order.
        //In this example, common.js will hold jquery, so backbone
        //needs to be delayed from loading until common.js finishes.
        //That loading sequence is controlled in page1.js.
        {
            //module names are relative to baseUrl/paths config
            name: 'sheetListMain',
            exclude: ['common']
        },

        {
            //module names are relative to baseUrl
            name: 'sheetItemMain',
            exclude: ['common']
        }

    ]
}
