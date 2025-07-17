<template>
    <UCard>
        <UStepper ref="stepper" :items="NEW_SYSTEM_STEPPER" v-model="stepperValue" disabled>
            <template #basic>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 1: Basic Information
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects basic information about the system.
                    </p>
                    <UForm :schema="basicSchema" :state="basicStepperState" class="space-y-4 mt-4" ref="basicForm">
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <UFormField label="System Name" size="lg" required class="col-span-3 lg:col-span-4"
                                name="systemName">
                                <UInput class="w-full" placeholder="e.g. Disaster Resilience Informatics Platform"
                                    v-model="basicStepperState.systemName" />
                            </UFormField>

                            <UFormField label="System Code / Acronym" size="lg" required
                                class="md:col-span-2 lg:col-span-1" name="systemCode">
                                <UInput class="w-full" placeholder="e.g. DRIP" v-model="basicStepperState.systemCode" />
                            </UFormField>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <UFormField label="Year Implemented" size="lg" required name="yearImplemented">
                                <UInput class="w-full" placeholder="e.g. 2025"
                                    v-model="basicStepperState.yearImplemented" />
                            </UFormField>

                            <UFormField label="System status" size="lg" required name="systemStatus">
                                <USelect :items="status" placeholder="Select status" class="w-full"
                                    v-model="basicStepperState.systemStatus" />
                            </UFormField>

                            <UFormField label="Owner Department/Unit" size="lg" required name="departmentUnit">
                                <UInput class="w-full" placeholder="e.g. ICTC"
                                    v-model="basicStepperState.departmentUnit" />
                            </UFormField>
                        </div>
                    </UForm>
                </UCard>
            </template>
            <template #technical>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 2: Technical Details
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects technical details about the system, including database, storage, and
                        modules.
                    </p>
                    <UForm :schema="technicalSchema" :state="technicalStepperState" class="space-y-4 mt-4"
                        ref="techForm">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UFormField label="Data Storage" size="lg" name="dataStorage">
                                <USelect :items="storage" placeholder="Select storage" class="w-full" name="systemName"
                                    v-model="technicalStepperState.dataStorage" />
                            </UFormField>
                            <UFormField label="Database Type" size="lg" name="dbType">
                                <UInput placeholder="e.g. RDBMS" class="w-full" name="systemName"
                                    v-model="technicalStepperState.dbType" />
                            </UFormField>
                        </div>
                        <UFormField label="Archiving/Storage Media" size="lg" name="storage">
                            <UTextarea :rows="4" placeholder="e.g. RDBMS + Cloud" class="w-full" name="systemName"
                                v-model="technicalStepperState.storage" />
                        </UFormField>
                        <UFormField label="Associated Modules" size="lg" name="assocModules">
                            <UTextarea :rows="4" placeholder="e.g. Enrollment, Payroll, Billing" name="systemName"
                                v-model="technicalStepperState.assocModules" class="w-full" />
                        </UFormField>
                    </UForm>
                </UCard>
            </template>
            <template #usage>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 3: Usage &
                        Integration</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects information about users and systems linked to the system.
                    </p>
                    <UForm :schema="usageSchema" :state="usageStepperState" class="space-y-4 mt-4" ref="usageForm">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" name="internalUser">
                            <UFormField label="Internal Users" size="lg" required>
                                <UInput placeholder="e.g. Office of the President, HRDO" class="w-full"
                                    v-model="usageStepperState.internalUser" />
                            </UFormField>
                            <UFormField label="External Users" size="lg" name="externalUser">
                                <UInput placeholder="e.g. MSU Constituents" class="w-full"
                                    v-model="usageStepperState.externalUser" />
                            </UFormField>
                        </div>
                        <UFormField label="Linked Systems" size="lg" name="linkedSystem">
                            <UInput placeholder="e.g. CMS, Financial System" class="w-full"
                                v-model="usageStepperState.linkedSystem" />
                        </UFormField>

                        <FormSystemPerformanceMetrics />
                        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UFormField label="Performance Metrics" size="lg" name="performanceMetrics">
                                <UInput placeholder="e.g. SLA %, Uptime %, Client Satisfaction" class="w-full"
                                    v-model="usageStepperState.performanceMetrics" />
                            </UFormField>
                        </div> -->
                    </UForm>
                </UCard>
            </template>
            <template #security>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 4: Security & Notes
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects security details and any additional notes about the system.
                    </p>
                    <UForm :schema="securitySchema" :state="securityStepperState" class="space-y-4 mt-4"
                        ref="securityForm">
                        <UFormField label="Security Features" size="lg" name="securityFeatures">
                            <UTextarea :rows="4" placeholder="e.g. MFA, encryption, audit logs" class="w-full"
                                v-model="securityStepperState.securityFeatures" />
                        </UFormField>
                        <UFormField label="Remarks / Notes" size="lg" name="remarks">
                            <UTextarea :rows="4" placeholder="e.g. Pending approval, upgrade planned for Q4"
                                class="w-full" v-model="securityStepperState.remarks" />
                        </UFormField>
                    </UForm>
                </UCard>
            </template>
            <template #deliverables>
                <FormSystemDeliverables />
            </template>
            <template #concerns>
                <FormSystemStrategicConcern />
            </template>
        </UStepper>

        <div class="flex gap-2 justify-between mt-4">
            <UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev" @click="prevStepper"
                label="Prev" />
            <UButton v-if="stepper?.hasNext" trailing-icon="i-lucide-arrow-right" @click="nextStepper" label="Next" />

            <UButton v-else color="primary" trailing-icon="i-lucide-check" @click="onSubmit">Submit
            </UButton>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { NEW_SYSTEM_STEPPER } from '~/constants/constants'
const stepper = useTemplateRef('stepper')
const status = ref(['Planned', 'In Progress', 'Operational', 'For Enhancement'])
const storage = ref(['On-premise', 'Cloud', 'Hybrid'])

const stepperValue = ref<number>(0)
const basicForm = useTemplateRef('basicForm')
const techForm = useTemplateRef('techForm')
const usageForm = useTemplateRef('usageForm')
const securityForm = useTemplateRef('securityForm')

const basicStepperState = reactive<Partial<BasicStepperSchema>>({
    systemName : '',
    systemCode : '',
    yearImplemented : '',
    systemStatus : '',
    departmentUnit : '',
})

const technicalStepperState = reactive<Partial<TechnicalStepperSchema>>({
    dataStorage : '',
    dbType : '',
    storage : '',
    assocModules : '',
})

const usageStepperState = reactive<Partial<UsageStepperSchema>>({
    internalUser : '',
    externalUser : '',
    linkedSystem : '',
    performanceMetrics : '',
})

const securityStepperState = reactive<Partial<SecurityStepperSchema>>({
    securityFeatures : '',
    remarks : '',
})

const reset = () => {
    stepperValue.value = 0
    Object.assign(basicStepperState, {
        systemName: '',
        systemCode: '',
        yearImplemented: '',
        systemStatus: '',
        departmentUnit: ''
    })
    
    Object.assign(technicalStepperState, {
        dataStorage: '',
        dbType: '',
        storage: '',
        assocModules: ''
    })
    
    Object.assign(usageStepperState, {
        internalUser: '',
        externalUser: '',
        linkedSystem: '',
        performanceMetrics: ''
    })
    
    Object.assign(securityStepperState, {
        securityFeatures: '',
        remarks: ''
    })
}

const prevStepper = () => stepper.value?.prev()
const nextStepper = async () => {
    try {
        switch(stepperValue.value) {
            case 0 :
                await basicForm.value?.validate()
                break;
            case 2 :
                await usageForm.value?.validate()
                break;
        }
        stepper.value?.next()
    } catch (error) {
        console.error(error)
    }
}

const onSubmit = () => {
    console.log( 'Submit clicked!' )
}
</script>