/* --------------------------------------------------------------------------
 * File        : config-peity.js
 * Author      : indonez
 * Author URI  : http://www.indonez.com
 *
 * Indonez Copyright 2020 All Rights Reserved.
 * -------------------------------------------------------------------------- */

    'use strict';

    const StenaLineChart = {
        theme_plugin: function() {
            const element = document.querySelectorAll('.stena-line-chart');
            element.forEach(chart => {
                peity(chart, 'line', {
                    delimiter: ',',
                    fill: '#f1f7ff',
                    max: null,
                    min: 40,
                    stroke: '#5FA1FC',
                    strokeWidth: 2,
                    width: '100%',
                    height: '123'
                })
            })
        },
        theme_init: function() {
            StenaLineChart.theme_plugin();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        StenaLineChart.theme_init();
    });