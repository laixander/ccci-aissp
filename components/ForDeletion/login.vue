<template>
    <div class="min-h-screen w-full flex flex-col items-center gap-6 lg:flex-row bg-white dark:bg-gray-950 relative"
        :class="position === 'right' ? 'lg:justify-end' : 'lg:justify-start'">
        <!-- Background Image for Large Screens -->
        <div v-if="!isSmallScreen" class="hidden lg:block absolute inset-0 bg-cover bg-left"
            :style="{ backgroundImage: `url(${computedBgImage})` }"></div>

        <!-- Overlay -->
        <div v-if="!isSmallScreen" class="hidden lg:block absolute inset-0" :class="gradientClass"></div>

        <!-- Content -->
        <div class="w-full lg:w-1/2 flex justify-center items-center p-4 order-last relative z-10">
            <div class="max-w-xs w-full space-y-4 text-center">
                <!-- Dynamic Logo -->
                <UAvatar v-if="computedLogo" :ui="{ rounded: 'rounded-md' }" size="3xl" :src="computedLogo"
                    alt="App Logo" />

                <!-- Dynamic Title -->
                <header class="space-y-2">
                    <h1 class="font-extralight text-3xl text-gray-800 dark:text-gray-50">
                        {{ title || "Place your title here" }}
                    </h1>
                    <p class="font-light text-sm text-gray-500 dark:text-gray-400">
                        {{ subtitle || "This is a placeholder for your description" }}
                    </p>
                </header>

                <div class="space-y-4">
                    <UFormField label="Email" name="email" size="lg">
                        <UInput v-model="model.username" class="w-full" />
                    </UFormField>

                    <UFormField label="Password" name="password" size="lg">
                        <UInput type="password" v-model="model.password" class="w-full" />
                    </UFormField>

                    <div class="flex justify-between items-center">
                        <UCheckbox name="remember" label="Remember Me" />
                        <ULink to="#"
                            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            @click.prevent="emit('recover')">
                            Forgot Password?
                        </ULink>
                    </div>

                    <UButton label="Login" size="lg" block @click="emit('login')" :loading="loading" />

                    <template v-if="enableOAuth">
                        <USeparator label="OR" />
                        <UButton color="neutral" variant="outline" label="Login with Google"
                            icon="i-simple-icons-google" size="lg" block />
                    </template>
                </div>
            </div>
        </div>

        <!-- Background Image for Small Screens -->
        <div v-if="isSmallScreen" class="w-full h-[120px] bg-cover bg-center lg:hidden"
            :style="{ backgroundImage: `url(${computedBgImage})` }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const model = ref({ username: "", password: "" });

const emit = defineEmits(["recover", "login"]);

const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 1024);

const props = defineProps<{
    loading?: boolean;
    enableOAuth?: boolean;
    logo?: string;
    bgImage?: string;
    title?: string;
    subtitle?: string;
    position?: "right" | "left";
    styleType?: "diagonal" | "straight";
}>();

const computedLogo = computed(() => props.logo || "/logo.png");
const computedBgImage = computed(() => props.bgImage || "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b");

const gradientClass = computed(() => {
    const styles = {
        diagonal: {
            right: "bg-[linear-gradient(108deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(108deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
            left: "bg-[linear-gradient(-108deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(-108deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
        },
        straight: {
            right: "bg-[linear-gradient(90deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
            left: "bg-[linear-gradient(-90deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(-90deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
        },
    };

    // Ensure `props.styleType` and `props.position` have default values
    const styleType = props.styleType ?? "diagonal";
    const position = props.position ?? "right";

    return styles[styleType][position]; // Safe indexing
});
</script>