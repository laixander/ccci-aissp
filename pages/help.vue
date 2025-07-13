<template>
    <Page page-title="Help Page" page-description="A quick guide for developers on building pages and UI components">
        <template #content>
            <Block title="" description="">
                <template #content>
                    <ComingSoon />
                    <!-- <ul class="list-disc list-inside">
                        <li>Main</li>
                        <li>Section</li>
                        <li>Page</li>
                        <li>Block</li>
                        <li>Group</li>
                    </ul> -->
                </template>
            </Block>
        </template>
    </Page>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})
</script>