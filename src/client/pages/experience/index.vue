<template>
        <v-container grid-list-xs>
                Hello 
                <v-list>
 
                        <div v-for="(item, index) in experiences" :key="index">
                        {{item.title}}
                        </div>

                        <div>
                        {{greetings}}
                        </div>
                </v-list>
                <v-btn color="success" @click="fetchAgain()">text</v-btn>
        </v-container>
</template>

<script>
import { mapState } from 'vuex'

        export default {
            data(){
                    return {

                    }
            },    
            computed: {
                    greetings: ()=> "Hello Worlddd",
                    ...mapState('experiences',
                            ['experiences']
                    )
            },
            fetch({store, params, req}){
                    return store.dispatch('experiences/fetchExps', {params})
            },
            methods: {
                    async fetchAgain(){
                            this.$store.dispatch('experiences/emptyExperiences');
                            setTimeout(()=>{
                                    return this.$store.dispatch('experiences/fetchExps', {params: {}});
                            }, 2000);
                            
                    }
            }
        }
</script>

<style scoped>

</style>