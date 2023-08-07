const printReport=(pages)=>{
    const sorted=quickSort(pages)

    for (const key in sorted) {
        console.log(`Found ${sorted[key]} internal links to ${key}`)
    }
}
const quickSort=(pages)=>{
    return pages
}

module.exports={
    printReport
}