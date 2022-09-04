<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import MiniGame from "@/Components/Game.vue";
import Visualizer from "@/Components/Visualizer.vue";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <MiniGame></MiniGame>
    <Visualizer></Visualizer>
    <Head title="Audias" />
    <div class="overflow-y-auto px-1 bg-gray-50 rounded dark:bg-gray-800">
      <ul class="space-y-2">
         <li>
             <Link
                v-if="$page.props.user"
                :href="route('dashboard')">
            <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span class="ml-3">Account</span>
            </a>
            </Link>
         </li>
         <li>

            <a href="https://www.francisnicholls.ch" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>

                <span class="flex-1 ml-3 whitespace-nowrap">About me</span>

            </a>
         </li>
         <li>
             <Link
                :href="route('tutorial.index')"  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Tutorial</span>
             </Link>
         </li>
         <li>
             <Link
                :href="route('login')" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Log In</span>
           </Link>

         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Register</span>
            </a>
         </li>
      </ul>
   </div>

    <div
        class="
            relative
            flex
            items-top
            justify-center
            min-h-screen
            sm:items-center sm:pt-0
        "
    >
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 pt-20">
            <div
                class="
                    flex
                    justify-center
                    pt-8
                    sm:justify-start sm:pt-0
                    text-red-700 text-3xl
                "
            >
                PROJECT AUDIAS

                <!-- LOGO IMAGE HERE -->
            </div>
            <div class="flex items-center mr-40">
                <img src="img/logo.png" class="max-h-md" alt="" />
                <img
                    src="img/displays/feat4.png"
                    class="max-w-md h-64"
                    alt=""
                />
            </div>

            <div class="mt-8 overflow-hidden shadow sm:rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <div class="p-6">
                        <div class="flex items-center">
                            <!-- FEATURE 1 IMAGE HERE -->
                            <div class="ml-12 text-lg leading-7 font-semibold">
                                <a
                                    href="/"
                                    class="
                                        underline
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Visualize songs<!-- FEATURE 2 TITLE HERE --></a
                                >
                            </div>
                        </div>

                        <div class="ml-12">
                            <div
                                class="
                                    mt-2
                                    text-gray-600
                                    dark:text-gray-400
                                    text-sm
                                "
                            >
                                <img
                                    src="img/displays/feat1.png"
                                    class="max-w-md h-64 rounded-full"
                                    alt=""
                                />
                                The algorithm finds out the track length and BPM
                                to create an interactive experience
                                <!-- FEATURE 1 TEXT HERE -->
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center">
                            <!-- FEATURE 1 IMAGE HERE -->
                            <div class="ml-12 text-lg leading-7 font-semibold">
                                <a
                                    href="/"
                                    class="
                                        underline
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Play mini-games<!-- FEATURE 2 TITLE HERE --></a
                                >
                            </div>
                        </div>

                        <div class="ml-12">
                            <div
                                class="
                                    mt-2
                                    text-gray-600
                                    dark:text-gray-400
                                    text-sm
                                "
                            >
                                <img
                                    src="img/displays/feat2.png"
                                    class="max-w-md h-64 rounded-full"
                                    alt=""
                                />
                                An integrated game engine enables the user to
                                then try out their favorite songs as a video
                                game
                                <!-- FEATURE 1 TEXT HERE -->
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center">
                            <!-- FEATURE 1 IMAGE HERE -->
                            <div class="ml-12 text-lg leading-7 font-semibold">
                                <a
                                    href="/"
                                    class="
                                        underline
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Advertising<!-- FEATURE 2 TITLE HERE --></a
                                >
                                <img
                                    src="img/displays/feat3.png"
                                    class="max-w-md h-64"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div class="ml-12">
                            <div
                                class="
                                    mt-2
                                    text-gray-600
                                    dark:text-gray-400
                                    text-sm
                                "
                            >
                                This product offers customers this perfect fit
                                for displaying interesting ads on their webpage
                                or app
                                <!-- FEATURE 1 TEXT HERE -->
                            </div>
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center">
                            <!-- FEATURE 1 IMAGE HERE -->
                            <div class="ml-12 text-lg leading-7 font-semibold">
                                <a
                                    href="/"
                                    class="
                                        underline
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Create images from audio data<!-- FEATURE 2 TITLE HERE --></a
                                >
                                <img
                                    src="img/displays/feat4.png"
                                    class="max-w-md h-64"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div class="ml-12">
                            <div
                                class="
                                    mt-2
                                    text-gray-600
                                    dark:text-gray-400
                                    text-sm
                                "
                            >
                                FEATURE FEATURE FEATURE
                                <!-- FEATURE 1 TEXT HERE -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="
                    flex
                    justify-center
                    mt-4
                    sm:items-center sm:justify-between
                "
            >
                <div class="text-center text-sm text-gray-500 sm:text-left">
                    <div class="flex items-center">
                        ICON
                        <!-- ICON 1 TEXT HERE -->

                        LINK
                        <!-- LINK 1 TEXT HERE -->

                        ICON
                        <!-- ICON 2 TEXT HERE -->

                        LINK
                        <!-- LINK 2 TEXT HERE -->
                    </div>
                </div>

                <div
                    class="
                        ml-4
                        text-center text-sm text-gray-500
                        sm:text-right sm:ml-0
                    "
                >
                    LOGOS TECHNOLOGY
                    <!-- FEATURE 1 TEXT HERE -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    setup() {
        let scriptTag = document.createElement("script");
        scriptTag.async = true;
        scriptTag.setAttribute("src", `URL to your external script tag`);
        document.head.appendChild(scriptTag);
    },
};
</script>
