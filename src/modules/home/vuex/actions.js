import axios from 'axios'

const actions = {
    async loadStudents({ commit }){
        return await axios.get('https://api.hatchways.io/assessment/students')
                        .then( res => commit("setStudents",res.data.students))
                        .catch( err => console.log(err))
    },
   
}

export default actions;