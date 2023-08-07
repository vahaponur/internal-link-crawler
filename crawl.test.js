const { test, expect } = require('@jest/globals')
const {normalizeURL,getURLsFromHTML}=require('./crawl.js')

test('normalize test for https://google.com/path/',()=>{
    expect(normalizeURL('https://google.com/path/')).toBe('google.com/path')
})
test('normalize test for google.com/path/',()=>{
    expect(normalizeURL('google.com/path/')).toBe('google.com/path')
})
test('normalize test for https://google.com/path',()=>{
    expect(normalizeURL('https://google.com/path')).toBe('google.com/path')
})

test('getURLsFromHTML relative to absolute,',()=>{
    expect(getURLsFromHTML('<a href="https://boot.dev">Learn Backend Development</a>\
    <a href="https://www.front.dev">Learn front Development</a>\
    <a href="/menu/about-us"></a>','http://vahap.com')[2]).toBe('http://vahap.com/menu/about-us')
})
test('getURLsFromHTML number of links,',()=>{
    expect(getURLsFromHTML('<a href="https://boot.dev">Learn Backend Development</a>\
    <a href="https://www.front.dev">Learn front Development</a>\
    <a href="/menu/about-us"></a>','http://vahap.com').length).toBe(3)
})