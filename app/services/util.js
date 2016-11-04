'use strict';

app.service('utilService', [
    '$rootScope', 'CONSTANTES', '$http', '$log', '$q', '$location',
    function ($rootScope, CONSTANTES, $http, $log, $q, $location) {

        var self = this;

        self.getUrlServidor = function () {
            return CONSTANTES.URL_SERVIDOR.replace('{{HOST}}', $location.host());
        }


        self.retiraAcentos = function (palavra) {
            var com_acento = 'Ã¡Ã Ã£Ã¢Ã¤Ã©Ã¨ÃªÃ«Ã­Ã¬Ã®Ã¯Ã³Ã²ÃµÃ´Ã¶ÃºÃ¹Ã»Ã¼Ã§ÃÃ€ÃƒÃ‚Ã„Ã‰ÃˆÃŠÃ‹ÃÃŒÃŽÃÃ“Ã’Ã•Ã–Ã”ÃšÃ™Ã›ÃœÃ‡';
            var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
            var nova = '';
            if (!angular.isUndefined(palavra) && palavra != '') {
                for (var i = 0; i < palavra.length; i++) {
                    try {
                        if (com_acento.search(palavra.substr(i, 1)) >= 0) {
                            nova += sem_acento.substr(com_acento.search(palavra.substr(i, 1)), 1);
                        } else {
                            nova += palavra.substr(i, 1);
                        }
                    } catch (e) {
                        //$log.log(palavra.substr(i, 1));
                    }
                }
            }
            return nova;
        }

        self.readFileSync = function (file, format) {
            var fs = require('fs');
            return fs.readFileSync(file, format);
        }


        // Import NWJS libs     	
        self.manifest = '';
        self.os = '';
        self.dns = '';
        self.childProcess = '';
        self.fs = '';
        self.path = '';
        self.nw_gui = '';
        self.ini = '';

        self.getManifest = function () {
            if (self.manifest == '') {
                self.manifest = require('./package.json')
            }
            return self.manifest;
        }
        self.getCurrentWindow = function () {
            // Get the current window
            return nw.Window.get();
        }
        // Create a new window and get it
        self.open = function (url, options, callback) {
            // Create a new window and get it
            nw.Window.open(url, options, callback);
        }
        self.getNwGui = function () {
            if (self.nw_gui == '') {
                self.nw_gui = require("nw.gui");
            }
            return self.nw_gui;
        }

        self.getChildProcess = function () {
            if (self.childProcess == '') {
                self.childProcess = require("child_process");
            }
            return self.childProcess;
        }
        self.getFileSistem = function () {
            if (self.fs == '') {
                self.fs = require("fs");
            }
            return self.fs;
        }

        self.getOS = function () {
            if (self.os == '') {
                self.os = require("os");
            }
            return self.os;
        }
        self.getDNS = function () {
            if (self.dns == '') {
                self.dns = require("dns");
            }
            return self.dns;
        }
        self.getPath = function () {
            if (self.path == '') {
                self.path = require("path");
            }
            return self.path;
        }
        self.getIniParser = function () {
            if (self.ini == '') {
                self.ini = require("ini");
            }
            return self.ini;
        }




    }]);