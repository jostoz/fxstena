/* --------------------------------------------------------------------------
 * File        : config-theme.js
 * Author      : indonez
 * Author URI  : http://www.indonez.com
 *
 * Indonez Copyright 2020 All Rights Reserved.
 * -------------------------------------------------------------------------- 
 * javascript handle initialization
    1. Slideshow
    2. Counter
    3. Mobile nav button
 * -------------------------------------------------------------------------- */

    'use strict';

    const HomepageApp = {
        //----------- 1. Slideshow -----------
        theme_slideshow: function() {
            new CarouselConfig({
                element: '#slideshow',              // carousel element id
                fadeTransition: false,              // default is slide, use 'true' if want use fade effect
                interval: 6000,                     // interval between change slide
                control: {
                    type: 'button',                 // the options is: 'button', 'indicator' and 'both'
                    onHover: true                   // control appears when hover in careousel element
                },
                height: {                           // height for every devices
                    desktop: '700px',
                    tablet: '480px',
                    phone: '580px'
                }
            }).init();
        },
        //---------- 3. Mobile nav button -----------
        theme_mobilenav: function() {
            new MobileNavbar({
                addonButtons: true,                 // options to use addon buttons, set it "false" if you won't use addon buttons
                buttons: [
                    {
                        name: 'Login',              // button name
                        url: 'signin.html',         // button url
                        type: 'primary',            // button type (default, primary, secondary, danger, text)
                        icon: 'sign-in-alt'         // button icon, you can use all icons from here : https://fontawesome.com/icons?d=gallery&s=solid&m=free
                    },
                ]
            }).init();
        },
        //---------- 3. Tradingview widget -----------
        theme_tradingview: function() {
            if(window.hasOwnProperty('TradingviewWidget')) {
                new TradingviewWidget({
                    element: "#tradingview-widget",
                    height: 378,
                    type: "market-overview",
                    theme: "light",
                    symbol: [                       // array of instruments symbol based on Tradingview
                        {s: "FX:EURUSD"},
                        {s: "FX:GBPUSD"},
                        {s: "FX:USDJPY"},
                        {s: "FX:USDCHF"},
                        {s: "FX:AUDUSD"},
                        {s: "FX:USDCAD"}
                    ]
                }).init()
            }
        },
        //---------- 4. Step hover animations -----------
        theme_stephover: function() {
            if(document.querySelector('.in-stena-3') !== null) {
                const stepsEl = document.querySelectorAll('.invest-step')

                stepsEl[0].classList.add('active')
                stepsEl.forEach(el => {
                    el.addEventListener('mouseover', () => {
                        stepsEl[0].classList.remove('active')
                        el.classList.add('active')
                    })
                    el.addEventListener('mouseout', () => {
                        el.classList.remove('active')
                        stepsEl[0].classList.add('active')
                    })
                })
            }
        },
        theme_init: function() {
            HomepageApp.theme_slideshow();
            HomepageApp.theme_mobilenav();
            HomepageApp.theme_tradingview();
            HomepageApp.theme_stephover();
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        HomepageApp.theme_init();
    });