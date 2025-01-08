const players = [
    { name: "Messi", goals: 30 },
    undefined,
    { name: "Ronaldo", goals: 299 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
];

// function isValidPlayer(player){
//     return player && player.name && typeof player.goals ==='number';
// }

// let topSoccer = null;
// let filterPlayer = players.filter(player=>{
//     if(isValidPlayer(player)){
//         if(!topSoccer || player.goals > topSoccer.goals){
//             topSoccer = player;
//         }
//         return true;
//     }
//     return false;
// });

// console.log('Danh sách cầu thủ hợp lệ:',filterPlayer);
// console.log('Danh Cầu thủ ghi nhiều bàn thắng nhất: ',topSoccer);

const isValidPlayer = (player) => {
    return player && player.name && typeof player.goals === "number";
}

const filterPlayer = players.filter(player => {

    return isValidPlayer(player);
})

console.log('Danh sách câu thủ hợp lệ : ',filterPlayer);

const topSoccer1 = filterPlayer.reduce((max, player) => player.goals > max.goals ? player : max , filterPlayer[0]);
console.log('Cầu thủ ghi nhiều bàn thắng nhất : ',topSoccer1.name); 
console.log('Số bàn : ',topSoccer1.goals); 
