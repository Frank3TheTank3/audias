<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import MiniGame from "@/Components/Game.vue";
import Visualizer from "@/Components/Visualizer.vue";
import Sidebar from "@/Components/Sidebar.vue";

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
 <Sidebar></Sidebar>
    <Head title="Audias" />
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
        <div
            v-if="canLogin"
            class="hidden fixed top-0 right-0 px-6 py-4 sm:block"
        >
            <Link
                v-if="$page.props.user"
                :href="route('dashboard')"
                class="text-sm text-gray-700 dark:text-gray-500 underline"
                >Dashboard</Link
            >

            <template v-else>
                <Link
                    :href="route('login')"
                    class="text-sm text-gray-700 dark:text-gray-500 underline"
                    >About</Link
                >

                <Link
                    :href="route('login')"
                    class="
                        ml-4
                        text-sm text-gray-700
                        dark:text-gray-500
                        underline
                    "
                    >Contact</Link
                >

                <Link
                    :href="route('login')"
                    class="
                        ml-4
                        text-sm text-gray-700
                        dark:text-gray-500
                        underline
                    "
                    >Log in</Link
                >

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="
                        ml-4
                        text-sm text-gray-700
                        dark:text-gray-500
                        underline
                    "
                    >Register</Link
                >
            </template>
        </div>

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
