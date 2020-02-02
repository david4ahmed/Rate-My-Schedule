// const express = require('express');
const proxy = require('http-proxy-middleware');

// const app = express;

module.exports = function(app) {
    app.use(proxy('/auth/google', {target: 'http://localhost:8080/', changeOrigin: true}));
    app.use(proxy('/auth/google/callback', {target: 'http://localhost:8080/', changeOrigin: true}));
    app.use(proxy('/api/', {target: 'http://localhost:8080/', changeOrigin:true}));
    app.use(proxy('/api/logout', {target: 'http://localhost:8080/', changeOrigin:true}));
    app.use(proxy('/api/schedules/create', {target: 'http://localhost:8080/', changeOrigin:true}));
    app.use(proxy('/api/schedules', {target: 'http://localhost:8080/', changeOrigin:true}));
}