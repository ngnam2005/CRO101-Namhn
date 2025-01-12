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


