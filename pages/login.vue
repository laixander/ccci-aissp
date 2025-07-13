<template>
    <div class="min-h-screen w-full flex flex-col items-center gap-6 lg:flex-row bg-white dark:bg-gray-950 relative"
        :class="computedLoginPosition === 'right' ? 'lg:justify-end' : 'lg:justify-start'">
        <!-- Background Image for Large Screens -->
        <div v-if="!isSmallScreen" class="hidden lg:block absolute inset-0 bg-cover bg-left"
            :style="{ backgroundImage: `url(${computedBgImage})` }"></div>

        <!-- Overlay -->
        <div v-if="!isSmallScreen" class="hidden lg:block absolute inset-0" :class="gradientClass"></div>

        <!-- Login -->
        <div class="w-full lg:w-1/2 flex justify-center items-center p-4 order-last relative z-10">
            <div class="max-w-xs w-full space-y-4 text-center">
                <!-- Dynamic Logo -->
                <NuxtImg v-if="computedLogo" :src="computedLogo" alt="Digital Solution" width="80" height="80"
                    class="mx-auto" />

                <!-- Dynamic Title -->
                <header class="space-y-2">
                    <h1 class="font-extralight text-3xl text-gray-800 dark:text-gray-50">
                        {{ title || "Welcome Back!" }}
                    </h1>
                    <p class="font-light text-sm text-gray-500 dark:text-gray-400">
                        {{ description || "Please login to continue" }}
                    </p>
                </header>

                <UForm :state="formState" @submit="handleLogin" class="space-y-4">

                    <UFormField label="Username" name="username" size="lg">
                        <UInput v-model="formState.username" class="w-full" />
                    </UFormField>

                    <UFormField label="Password" name="password" size="lg">
                        <UInput v-model="formState.password" :type="showPassword ? 'text' : 'password'" class="w-full"
                            :ui="{ trailing: 'pe-1' }">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    @click.prevent="togglePassword" />
                            </template>
                        </UInput>
                    </UFormField>


                    <div class="flex justify-between items-center">
                        <UCheckbox name="remember" label="Remember Me" />
                        <ULink to="#"
                            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            Forgot Password?
                        </ULink>
                    </div>

                    <!-- <UButton label="Login" size="lg" block @click="emit('login')" :loading="loading" /> -->
                    <UButton label="Login" type="submit" size="lg" :loading="loading" block />

                    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
                </UForm>
            </div>
        </div>

        <!-- Background Image for Small Screens -->
        <div v-if="isSmallScreen" class="w-full h-[120px] bg-cover bg-center lg:hidden"
            :style="{ backgroundImage: `url(${computedBgImage})` }"></div>
    </div>
</template>

<script setup lang="ts">
const showPassword = ref(false)
const togglePassword = () => {
    showPassword.value = !showPassword.value
}
// Handle Auth
const formState = reactive({
    username: '',
    password: ''
})
const error = ref('')
const loading = ref(false)

const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
    loading.value = true
    error.value = ''

    const { username, password } = formState

    await new Promise((r) => setTimeout(r, 500))

    if (username === 'admin' && password === 'password') {
        login({ username })
        router.push('/')
    } else {
        error.value = 'Invalid username or password'
    }

    loading.value = false
}

// Handle Content
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 1024);

const props = defineProps<{
    logo?: string;
    bgImage?: string;
    title?: string;
    description?: string;
    position?: "right" | "left";
    styleType?: "diagonal" | "straight";
}>();

const computedLogo = computed(() => props.logo || "assets/logo.png");
const computedBgImage = computed(() => props.bgImage || randomImage);
const computedLoginPosition = computed(() => props.position ?? 'right');

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
    const styleType = props.styleType ?? "straight";
    const position = props.position ?? "right";

    return styles[styleType][position]; // Safe indexing
});

const bgImages = [
    "https://images.unsplash.com/photo-1668763263612-24fe81663e8a",
    "https://images.unsplash.com/photo-1708844897353-649da595a3f2",
    "https://images.unsplash.com/photo-1659952586072-b3cebadec6d2",
    "https://images.unsplash.com/photo-1710781944947-7cd4a381499f",
    "https://images.unsplash.com/photo-1699100329878-7f28bb780787",
    "https://images.unsplash.com/photo-1700116035176-99d81e11c60b"
    // Add as many as you want
];

const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
</script>

<style lang="css" scoped>
/* Hide the password reveal button in Edge */
::-ms-reveal {
    display: none;
}
</style>