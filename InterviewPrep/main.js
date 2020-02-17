let arr = new Array();
arr.push(2);
arr.push(1);
arr.push(6);
arr.push(20);
arr.push(12);

function printArr() {
    document.getElementById('result').innerHTML = '';
    for (let i = 0; i <= arr.length - 1; i++) {
        document.getElementById('result').innerHTML += arr[i] + ' ';
    }
}

function swap(a, b) {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

function bubbleSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1)
            }
        }
    }
}

function cocktailSort() {
    let left = 0;
    let right = arr.length - 1;
    do {
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(i, i + 1)
            }
        }
        right--;
        for (let j = right; j > left; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(j, j - 1);
            }
        }
        left++;
    } while (left < right);

}

function selectionSort() {
    let min = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            swap(min, i);
        }
    }
}

function insertionSort() {
    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i];
        let prev = i;
        while (prev > 0 && arr[prev - 1] > cur) {
            arr[prev] = arr[prev - 1]
            prev--;
        }
        arr[prev] = cur;
    }
}