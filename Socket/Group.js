class Group{
    constructor(users,name,dLong,dLat){
        this.users = users;
        this.name = name;  //unique id
        this.dLong = dLong; //destinaion coords
        this.dLat = dLat;
    }

    addUser(user){
        this.users.push(user);
    }
}

module.exports = Group;