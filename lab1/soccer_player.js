const players = [
    { name: "Messi", goals: 30 },
    undefined,
    { name: "Ronaldo", goals: 29 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
];

function isValidPlayer(player){
    return player && player.name && typeof player.goals ==='number';
}

let topSoccer = null;
let filterPlayer = players.filter(player=>{
    if(isValidPlayer(player)){
        if(!topSoccer || player.goals > topSoccer.goals){
            topSoccer = player;
        }
        return true;
    }
    return false;
});

console.log('Danh sách cầu thủ hợp lệ:',filterPlayer);
console.log('Danh Cầu thủ ghi nhiều bàn thắng nhất: ',topSoccer);
