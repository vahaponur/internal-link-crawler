const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

const argv = process.argv;

async function main(){
    if(argv.length !==3){
        console.log('error giving the base url')
        return
    }
    console.log(`Starting to crawl at: ${argv[2]}`)
    const pages = await crawlPage(argv[2],argv[2],{})
    printReport(pages)
}

main()