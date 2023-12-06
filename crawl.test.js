const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const  {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const  actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const  actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capital letters', ()=>{
    const input = 'https://BLOG.boot.dev/path/'
    const  actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http strip', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const  actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute url', ()=>{
    const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path/">
    Boot.dev blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path/'
    const  actual = getURLsFromHTML(inputHTMLBody, inputBaseURL )
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})
test('getURLsFromHTML relative url', ()=>{
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path/">
    Boot.dev blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const  actual = getURLsFromHTML(inputHTMLBody, inputBaseURL )
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both absolute and relative url', ()=>{
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path1/">
    Boot.dev blog
    </a>
     <a href="https://blog.boot.dev/path2/">
    Boot.dev blog2
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const  actual = getURLsFromHTML(inputHTMLBody, inputBaseURL )
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid url', ()=>{
    const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">
    Invalid url
    </a>
    </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const  actual = getURLsFromHTML(inputHTMLBody, inputBaseURL )
    const expected = []
    expect(actual).toEqual(expected)
})
