const printReport = (pages) => {
    const sorted = quickSortedPages(pages);

    sorted.forEach((element) => {
        console.log(`Found ${element[1]} internal links to ${element[0]}`);
    });
};

const quickSortedPages = (pages) => {
    const arr = Object.entries(pages);
    quickSort(arr, 0, arr.length - 1);
    return arr;
};

const quickSort = (kvArr, start, end) => {
    if (end <= start) return;
    let pivot = partition(kvArr, start, end);
    quickSort(kvArr, start, pivot - 1);
    quickSort(kvArr, pivot + 1, end);
};

const partition = (kvArr, start, end) => {
    let pivot = kvArr[end][1];
    let pivotEntry = kvArr[end];
    let i = start - 1;
    let temp = 0;
    for (let j = start; j <= end - 1; j++) {
        if (kvArr[j][1] < pivot) {
            i++;
            temp = kvArr[i];
            kvArr[i] = kvArr[j];
            kvArr[j] = temp;
        }
    }

    i++;
    temp = kvArr[i];
    kvArr[i] = pivotEntry;
    kvArr[end] = temp;

    return i;
};

module.exports={
    printReport
}