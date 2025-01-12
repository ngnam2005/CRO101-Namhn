const oldData = [
    { code: 'ab', name: 'Son môi ' },
    { code: 'ac', name: 'Sửa rửa mặt ' },
    { code: null, name: null },
    { code: null, name: '' },
    { code: '', name: null }
];

const parseArrayToObject = ({ array = [], keyId = '' }) =>
    Object.fromEntries(
        array
            .filter(item => item[keyId] && item.name)
            .map(item => [item[keyId], item]) 
    );
const filterObj = obj => {
    Object.keys(obj).forEach(key => {
        if (key == null || key === '') {
            delete obj[key]; 
        }
    });
    return obj;
};

const obj = parseArrayToObject({ array: oldData, keyId: 'code' });
const cleanedObj = filterObj(obj);
console.table(obj);
console.table(filterObj(cleanedObj));
