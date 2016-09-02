'use strict';

import './assets/css/testpkg.css';

/**/
/* Import libraries for leaflet directive - https://github.com/angular-ui/ui-leaflet */
/* TODO the import of the leaflet.css cause a known error : css-loader error */
/* solved - see http://stackoverflow.com/questions/33732066/webpack-requirenode-modules-leaflet-leaflet-css */
/* edited the webpack.config.js at the root of the mean.io installation */
/**/
import './assets/lib/leaflet/dist/leaflet.js';
import './assets/lib/leaflet/dist/leaflet.css';
import './assets/lib/angular-simple-logger/dist/index.js';
import './assets/lib/ui-leaflet/dist/ui-leaflet.js';

/**/
/* Import libraries for leaflet directive - https://github.com/tombatossals/angular-leaflet-directive */
/* TODO the import of the leaflet.css cause a known error : css-loader error */
/**/
// require('./assets/lib/leaflet/dist/leaflet.js');
// //  require('./assets/lib/leaflet/dist/leaflet.css');
// require('./assets/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js');

/**/
/* Import libraries for OL3 directive - https://github.com/tombatossals/angular-openlayers-directive  */
/* TODO this won't works - SERVER SIDE ERROR */
/* ERROR in ./packages/custom/testpkg/public/assets/lib/angular-openlayers-directive/dist/angular-openlayers-directive.js
Module not found: Error: Cannot resolve module 'openlayers' in /home/ilpise/geoexpress/packages/custom/testpkg/public/assets/lib/angular-openlayers-directive/dist
 @ ./packages/custom/testpkg/public/assets/lib/angular-openlayers-directive/dist/angular-openlayers-directive.js 4:17-38 */
/**/

// var openlayers = require('./assets/lib/openlayers/ol.js');
// require('./assets/lib/angular-sanitize/angular-sanitize.min.js');
// require('./assets/lib/angular-openlayers-directive/dist/angular-openlayers-directive.js');
