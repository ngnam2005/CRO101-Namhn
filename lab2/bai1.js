function SoChan_SoLe(a, b) {
    let soChan = 0, soLe = 0;
    for (let i = a; i <= b; i++) {
        if (i % 2 === 0) {
            soChan++;
        } else {
            soLe++;
        }
    }
    console.log(`Số chẵn: ${soChan}`);
    console.log(`Số lẻ: ${soLe}`);
}

SoChan_SoLe(2, 10);