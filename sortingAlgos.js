// Merge Sort
const merge = (a1, a2) => {
    let results = [];

    while(a1.length && a2.length){
        

        if(a1[0] < a2[0]) {
            results.push(a1[0]);
            a1.shift();
        } else{
            results.push(a2[0]);
            a2.shift()
        }
    }

    if(a1.length) results = results.concat(a1);
    if(a2.length) results = results.concat(a2);

    return results;
}

const mergeSort = arr => {
    if(arr.length === 1) return arr; 

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right)
}

console.log(`Merge Sort: ${[mergeSort([2,5,1,2,6,3,3,1,4,8,3])]}`);

// ----------------------------------------------------------------

// Quick Sort
const pivot = (arr, start = 0, end = arr.length) => {
    const swap = (arr, idx1, idx2) => {
        [arr[idx2], arr[idx1]] = [arr[idx1], arr[idx2]]
    }

    const pivot = arr[start];
    let swapIndex = start;

    for(i = start + 1; i < end; i++){
        if(pivot > arr[i]){
            swapIndex++;
            swap(arr, swapIndex, i);
        }
    }

    swap(arr, start, swapIndex)

    return swapIndex;
}

const quickSort = (arr, left = 0, right = arr.length) => {
    if(left < right){
        const pivotIndex = pivot(arr, left, right);

        // Left side of pivot
        quickSort(arr, left, pivotIndex);

        // Right side of pivot
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

console.log(`Quick Sort: ${[quickSort([25,1,2,44,-17,3,109,4,8,3])]}`)

// ----------------------------------------------------------------

// Radix Sort
const getDigit = (num, i) =>{
    return Math.floor(Math.abs(num) / Math.pow(10,i)) % 10;
}

const digitCount = num => {
    if(num === 0) return 1;
    return Math.ceil(Math.log10(Math.abs(num)))
}

const maxDigit = nums => {
    let max = 0;

    nums.forEach(el =>  max = Math.max(digitCount(el), max))

    return max;
}

const radix = (arr, loop = 0, max = maxDigit(arr)) => {
    if(loop === max) return arr;
    
    const indices = [[],[],[],[],[],[],[],[],[],[]];

    arr.forEach(el => {
        const check = getDigit(el, loop);
        indices[check].push(el);
    });

    return radix(indices.flat(), loop + 1, max);
}

console.log(...radix([1,2,44,3,109,4,8,3]))