const {crawlPage} = require('./crawl.js')
function main(){
    if(process.argv.length < 3){
        console.log('no web site provided')
        process.exit(1)
    }

    if(process.argv.length > 3){
        console.log('too many cl args')
        process.exit(1)
    }
        console.log(`starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}
const baseURL = process.argv[2];
main()