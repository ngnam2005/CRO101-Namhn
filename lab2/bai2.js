let Dem_So0 = (a) => {
        let count = 0;
        do {
            let s = a % 10;
            if (s === 0) {
                count++;
            }
            a = Math.floor(a / 10);
        } while (a > 0);
        return count;
    }   
console.log(Dem_So0(0));


const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 2000);
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Error: some bug');
    });
});

const getList = async () => {
    return await fetch('https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow');
};

// Yêu cầu thứ nhất : Dừng khi một promise thất bại 
Promise.all([firstPromise, secondPromise, getList()])
    .then((results) => {
        console.log("Tất cả promise đã hoàn thành:", results);
    })
    .catch((error) => {
        console.error("Có lỗi xảy ra, dừng lại:", error);
    });

// Yêu cầu thứ hai : Chương trình sẽ luôn chạy bất kề promise nào thất bại hay thành công 
Promise.allSettled([firstPromise, secondPromise, getList()])
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index + 1} thành công:`, result.value);
            } else {
                console.error(`Promise ${index + 1} thất bại:`, result.reason);
            }
        });
    })
    .catch((error) => {
        console.error("Unexpected error:", error);
    })
    .finally(() => {
        console.log("Tất cả các promise đã hoàn thành bất kể kết quả.");
    });