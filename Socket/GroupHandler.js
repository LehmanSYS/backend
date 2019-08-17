const Group =require('./Group');
class GroupHandler{
    constructor(){
        this.groups = [];
    }

    addGroup(formData){
        const {users, name, long, lat} = formData;
        this.groups.push(new Group(users, name, long, lat));
    }

    exists(groupName){
        for(let i = 0; i< this.groups.length; i++){
            if(this.groups[i].name === groupName)
            {
                return true;
            }
        }
        return false;
    }
}

module.exports= GroupHandler;