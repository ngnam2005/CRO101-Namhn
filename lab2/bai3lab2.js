const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() =>
        resolve('foo'), 2000
    );
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() =>
        reject('Erorr, some bug '), 2000
    );
});

const getList = async () => {
    await fetch('https://github.com/ngnam2005/CRO101-Namhn/tree/main/lab2')
}

// Yêu cầu 1: dừng chương trình khi gặp lỗi
Promise.all([firstPromise, secondPromise, getList()])
    .then((results) => {
        console.log("Tất cả promise đã hoàn thành", results)
    })
    .catch((error) => {
        console.error("Chương trình bị lỗi !!", error)
    })
    
// Yêu cầu 2: Chương trình sẽ luôn chạy bất kề promise nào thất bại hay thành công 
Promise.allSettled([firstPromise, secondPromise, getList()])
    .then((result) => {
        result.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index + 1} thành công`);
            } else {
                console.error(`Promise ${index + 1} thất bại `);
            }
        })
    })
    .catch((error) => {
        console.error("Chương trình bị lỗi !!", error)
    })
    .finally(() => {
        console.log("Tất cả promise đã hoàn thành ")
    })



