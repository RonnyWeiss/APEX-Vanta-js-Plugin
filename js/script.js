var apexVantaJSPlugin = (function () {
    "use strict";
    var scriptVersion = "1.0";
    var util = {
        version: "1.2.9",
        isAPEX: function () {
            if (typeof (apex) !== 'undefined') {
                return true;
            } else {
                return false;
            }
        },
        debug: {
            info: function (str) {
                if (util.isAPEX()) {
                    apex.debug.info(str);
                }
            },
            error: function (str) {
                if (util.isAPEX()) {
                    apex.debug.error(str);
                } else {
                    console.error(str);
                }
            }
        },
        jsonSaveExtend: function (srcConfig, targetConfig) {
            var finalConfig = {};
            var tmpJSON = {};
            /* try to parse config json when string or just set */
            if (typeof targetConfig === 'string') {
                try {
                    tmpJSON = JSON.parse(targetConfig);
                } catch (e) {
                    console.error("Error while try to parse targetConfig. Please check your Config JSON. Standard Config will be used.");
                    console.error(e);
                    console.error(targetConfig);
                }
            } else {
                tmpJSON = targetConfig;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                finalConfig = $.extend(true, srcConfig, tmpJSON);
            } catch (e) {
                console.error('Error while try to merge 2 JSONs into standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.error(e);
                finalConfig = srcConfig;
                console.error(finalConfig);
            }
            return finalConfig;
        }
    };

    return {

        initialize: function (pObj, pType, pOptions, pTypeOptions, pTexturePath) {

            util.debug.info({
                "pObj": pObj,
                "pType": pType,
                "pOptions": pOptions,
                "pTypeOptions": pTypeOptions,
                "pTexturePath": pTexturePath
            });

            var vantaStdJSON = {
                "mouseControls": true,
                "touchControls": true,
                "minHeight": 200.00,
                "minWidth": 200.00,
                "scale": 1.00,
                "scaleMobile": 1.00
            };

            var vantaJSON = util.jsonSaveExtend(vantaStdJSON, pOptions || {});

            /* find affected Element */
            var finSel;
            if (pObj) {
                var actions = pObj.action
                if (actions) {
                    if (actions.affectedElementsType) {
                        switch (actions.affectedElementsType) {
                            case "REGION":
                                finSel = "#" + pObj.action.affectedRegionId
                                break;
                            case "JQUERY_SELECTOR":
                                finSel = pObj.action.affectedElements;
                                break;
                            default:
                                util.debug.error("affectedElementsType is not REGION or JQUERY_SELECTOR");
                        }
                    } else {
                        util.debug.error("Error occured while try to find pObj.action.affectedElementsType");
                    }
                } else {
                    util.debug.error("Error occured while try to find pObj.action");
                }
            } else {
                util.debug.error("Error occured because pObj is undefined");
            }

            /* check type and call drawAnimation function */
            switch (pType) {
                case "waves":
                    drawWave();
                    break;
                case "net":
                    drawNet();
                    break;
                case "clouds":
                    drawClouds();
                    break;
                case "clouds2":
                    drawClouds2();
                    break;
                case "cells":
                    drawCells();
                    break;
                case "dots":
                    drawDots();
                    break;
                case "globe":
                    drawGlobe();
                    break;
                case "birds":
                    drawBirds();
                    break;
                case "fog":
                    drawFog();
                    break;
                case "rings":
                    drawRings();
                    break;
                case "halo":
                    drawHalo();
                    break;
                default:
                    util.debug.error("Vanta.js type no found: " + pType);
            }

            function drawNet() {
                var finStdJSON = {
                    "color": "#3a8ec9",
                    "backgroundColor": "#222222",
                    "points": 10,
                    "maxDistance": 20,
                    "spacing": 15,
                    "showDots": true
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.NET(finJSON);
            }

            function drawWave() {
                var finStdJSON = {
                    "color": "#505f6d",
                    "shininess": 30,
                    "waveHeight": 15,
                    "waveSpeed": 0.6,
                    "zoom": 1
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.WAVES(finJSON);
            }

            function drawClouds() {
                var finStdJSON = {
                    "backgroundColor": "white",
                    "skyColor": "#68b8d7",
                    "cloudColor": "#adc1de",
                    "cloudShadowColor": "#183550",
                    "sunColor": "#ff9919",
                    "sunGlareColor": "#ff6633",
                    "sunlightColor": "#ff9933",
                    "speed": 0.6
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.CLOUDS(finJSON);
            }

            function drawClouds2() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "skyColor": "#5ca6ca",
                    "cloudColor": "#334d80",
                    "lightColor": "white",
                    "speed": 0.8
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                finJSON.texturePath = pTexturePath;
                VANTA.CLOUDS2(finJSON);
            }

            function drawCells() {
                var finStdJSON = {
                    "color1": "#505f6d",
                    "color2": "#296c9b",
                    "size": 1.5,
                    "speed": 0.9
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.CELLS(finJSON);
            }

            function drawDots() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "color": "#3a8ec9",
                    "color2": "#3a8ec9",
                    "size": 3,
                    "spacing": 35,
                    "showLines": true
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.DOTS(finJSON);
            }

            function drawGlobe() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "color": "#3a8ec9",
                    "color2": "#3a8ec9",
                    "size": 1
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.GLOBE(finJSON);
            }

            function drawBirds() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "backgroundAlpha": 1,
                    "color": "#296c9b",
                    "color2": "#1e4b6b",
                    "colorMode": "varianceGradient",
                    "quantity": 5,
                    "birdSize": 1,
                    "wingSpan": 30,
                    "speedLimit": 5,
                    "separation": 20,
                    "alignment": 20,
                    "cohesion": 20
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.BIRDS(finJSON);
            }

            function drawFog() {
                var finStdJSON = {
                    "highlightColor": "#2574ac",
                    "midtoneColor": "#004678",
                    "lowlightColor": "#222222",
                    "baseColor": "#60a4d4",
                    "blurFactor": 0.6,
                    "zoom": 1,
                    "speed": 1
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.FOG(finJSON);
            }

            function drawRings() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "backgroundAlpha": 1,
                    "color": "#296c9b",
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.RINGS(finJSON);
            }

            function drawHalo() {
                var finStdJSON = {
                    "backgroundColor": "#222222",
                    "baseColor": "#296c9b",
                    "size": 1,
                    "amplitudeFactor": 1
                };
                var finJSONTmp = util.jsonSaveExtend(vantaJSON, finStdJSON);
                var finJSON = util.jsonSaveExtend(finJSONTmp, pTypeOptions || {});
                finJSON.el = finSel;
                VANTA.HALO(finJSON);
            }
        }
    }
})();
