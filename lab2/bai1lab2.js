const class1 = [{
    mssv: 'PS0000',
    name: 'Nguyen Van A',
    avgPoint: 8.9,
    avgTraningPoint: 7,
    status: 'pass',
}, {
    mssv: 'PS0001',
    name: 'Nguyen Van B',
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: 'pass',
}
];
const class2 = [{
    mssv: 'PS0002',
    name: 'Nguyen Van C',
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: 'failed',
}, {
    mssv: 'PS0003',
    name: 'Nguyen Van D',
    avgPoint: 10,
    avgTraningPoint: 10,
    status: 'pass',
},
{
    mssv: 'PS0004',
    name: 'Nguyen Van E',
    avgPoint: 10,
    avgTraningPoint: 2,
    status: 'pass',
},
]
//Danh sách sinh viên đã pass
const ListSinhVien = class1.concat(class2).filter(student => student?.status !== "failed");
console.log("Danh sách sinh viên đã pass")
console.table(ListSinhVien);
//Sắp xếp danh sách sinh viên theo điểm 
const ListSinhVienAvgPoint = ListSinhVien.sort((a, b) => b.avgPoint - a.avgPoint);
console.log("Sắp xếp danh sách sinh viên theo điểm ")
console.table(ListSinhVienAvgPoint);
//Sắp xếp danh sách sinh viên theo điểm rèn luyệnluyện
const ListSinhVienAvgTrainingPoint = ListSinhVien.sort((a, b) => b.avgTraningPoint - a.avgTraningPoint);
console.log("Sắp xếp danh sách sinh viên theo điểm rèn luyện")
console.table(ListSinhVienAvgTrainingPoint);
//Sinh viên được Ong Vàng 
console.log("Sinh viên được Ong Vàng");
console.table(ListSinhVienAvgPoint[0]);

