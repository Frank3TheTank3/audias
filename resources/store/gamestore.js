import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useGameStore = defineStore("gameStoreID", () => {

    let gameHasStarted = ref(false);
    let levelDistance = ref(3000);
    let movingHeight = ref(120);

    return{gameHasStarted, levelDistance, movingHeight};

})
