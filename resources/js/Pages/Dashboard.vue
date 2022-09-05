<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <h1 class="text-xl">Highscore List</h1>
                    <div class="m-4 p-4 bg-blue text-white" v-for="game in games" :key="game.id">
                         <h1 class="text-xl">Player: {{ game.playername }} with {{ game.score }} Points</h1>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>


<script>
export default{
  props:{
    games:Array
  }
}
</script>
