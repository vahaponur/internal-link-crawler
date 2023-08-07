const { JSDOM } = require('jsdom');
 
 const normalizeURL= (fullUrl)=>{ 
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

const getURLsFromHTML=(htmlBody,baseURL)=>{
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
        links.push(link)
    }
});
return links

}
module.exports={
    normalizeURL,
    getURLsFromHTML
}