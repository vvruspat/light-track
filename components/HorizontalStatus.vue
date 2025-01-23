<template>
    <UMeterGroup :min="0" :max="128" size="md" icon="i-heroicons-minus">
        <UMeter :value="72" color="gray" label="Open" />
        <UMeter :value="12" color="yellow" label="In Progress" />
        <UMeter :value="42" color="green" label="Done" />
        <UMeter :value="2" color="red" label="Rejected" />
    </UMeterGroup>
</template>