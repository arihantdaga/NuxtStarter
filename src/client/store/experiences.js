import {callService}  from '~/plugins/axios';
export const state = () =>{
        return {
                experiences : []
        }
}
export const mutations = {
        SET_EXPERIENCES(state,data){
                state.experiences = [...data];
        },
        EMPTY_EXPERIENCES(state){
                state.experiences = [];
        }
}

export const actions = {
       async fetchExps({commit}){
                let { data } = await callService(this.$axios, "get_experiences");
                console.log(data);
                commit("SET_EXPERIENCES", data);
                
       },
       async emptyExperiences({commit}){
        commit('EMPTY_EXPERIENCES');
       }


}