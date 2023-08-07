const { JSDOM } = require('jsdom');
 
 const normalizeURL = (fullUrl)=>{ 
    let protocolIndex=fullUrl.lastIndexOf("://")
    if(protocolIndex !== -1){
    fullUrl=fullUrl.slice(protocolIndex+3)
    }
    let lastSlashIndex = fullUrl.lastIndexOf('/')
    if (lastSlashIndex+1 === fullUrl.length){
    fullUrl=fullUrl.slice(0,lastSlashIndex)
    }
return fullUrl
}

const getURLsFromHTML = (htmlBody,baseURL)=>{
 const links= []
 const doc = new JSDOM(htmlBody)
 const linkHrefs =doc.window.document.querySelectorAll('a')
linkHrefs.forEach(element => {
    let link =element.getAttribute("href")
    if(link !==null){
        const isRelative = link.lastIndexOf("://") === -1
        if(isRelative){
        link=baseURL+link
     
        }
        if(!isCredential(baseURL,link)){
            links.push(link)
        }
        
    }
});
return links

}

const isCredential=(baseURL,url)=>{
    if(baseURL===url){
        return false
    }
    const sliced = url.slice(url.lastIndexOf(baseURL)+baseURL.length)

    return sliced[0] !=='/'
}

const crawlPage = async (baseURL,currentUrl,pages)=>{
try {
    const baseUrlObj=new URL(baseURL)
    const currentUrlObj = new URL(currentUrl)
if(baseUrlObj.host !== currentUrlObj.host){
    return pages

}
} catch (error) {
    console.log(error);
    return
}


const currentNormalized=normalizeURL(currentUrl)
if(currentNormalized in pages){
    pages[currentNormalized]++
    return pages
}
if (baseURL === currentUrl) 
    pages[currentNormalized]=0
else{
    pages[currentNormalized]=1
}
let webpageResponse = null
try {
 webpageResponse = await fetch(currentUrl)

} catch (error) {
    if(webpageResponse !== null && webpageResponse.status !== 200){

        console.log(`Status returned with an error: ${webpageResponse.status} `)
        return
    }
    console.log(error.message)
    return
}

const bodyHtml = await webpageResponse.text()
const urlsOnThePage=getURLsFromHTML(bodyHtml,baseURL)

urlsOnThePage.forEach(element => {
    crawlPage(baseURL,element,pages)
});
return pages



}
module.exports={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}