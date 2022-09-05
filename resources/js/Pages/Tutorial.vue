<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
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
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Choose a song<!-- FEATURE 2 TITLE HERE --></a
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
                                    src="img/music.jpg"
                                    class="max-w-md h-64 rounded-full"
                                    alt=""
                                />
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
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Collect coins<!-- FEATURE 2 TITLE HERE --></a
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
                                    src="img/ogcoin.png"
                                    class="max-w-md h-64 rounded-full"
                                    alt=""
                                />
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
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Turn into a fox<!-- FEATURE 2 TITLE HERE --></a
                                >
                                <img
                                    src="img/foxy.png"
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
                                        text-gray-900
                                        dark:text-white
                                    "
                                >
                                    Get a highscore and compare with friends</a
                                >
                                <img
                                    src="img/clouds.png"
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

