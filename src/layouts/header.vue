<template>
    <div>
        <v-app-bar border class="px-4 elevation-0" color="transparent">
            <v-avatar tile size="40" class="rounded-lg" color="primary">
                <img contain width="25" src="@/assets/QR_white.svg">
            </v-avatar>

            <v-app-bar-title class="font-weight-black">QRForInfo</v-app-bar-title>
            <v-badge location="top right" color="red" dot>
                <v-btn icon size="small">
                    <v-icon size="x-large" color="lightBlack" icon="mdi-bell-outline" class="pointer"></v-icon>
                </v-btn>
            </v-badge>
            <v-avatar color="grey" class="pointer ml-4">
                <v-icon color="lightBlack" >mdi-account-outline</v-icon>
            </v-avatar>
        </v-app-bar>
    </div>
</template>
<script setup>

</script>