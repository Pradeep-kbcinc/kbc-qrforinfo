<template>
    <div>
        <v-row>
            <v-col cols="12" md="6" class="right-col d-flex flex-column justify-center align-center">
                <div>
                    <v-avatar size="100" color="white">
                        <img contain src="@/assets/QR.svg">
                    </v-avatar>
                </div>
                <h1>
                    QRForInfo
                </h1>
                <h5 class="font-weight-medium my-4">
                    Simplify property listings with QR codes
                </h5>
                <div class="mt-4">
                    <div class="d-flex align-center">
                        <v-icon class="mr-2">mdi-check</v-icon>
                        <h6 class="font-weight-medium">
                            Generate QR codes instantly
                        </h6>
                    </div>
                    <div class="d-flex align-center my-4">
                        <v-icon class="mr-2">mdi-check</v-icon>
                        <h6 class="font-weight-medium">
                            Track property views
                        </h6>
                    </div>
                    <div class="d-flex align-center">
                        <v-icon class="mr-2">mdi-check</v-icon>
                        <h6 class="font-weight-medium">
                            Direct buyer-seller messaging
                        </h6>
                    </div>

                </div>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-left justify-center px-16">
                <v-container>


                    <h2>
                        Welcome Back
                    </h2>
                    <p class="">
                        Sign in to your account
                    </p>
                    <div class="mt-4">
                        <p class="text-body-2">Phone Number</p>
                        <v-text-field rounded="lg" placeholder="+91 987643210" max-width="500" label=""
                            variant="outlined"></v-text-field>
                        <v-btn class="text-none font-weight-bold" height="48" width="500" size="large" rounded="lg"
                            color="#2663eb" elevation="0">
                            Send OTP Code
                        </v-btn>
                        <p class="text-center mt-4">Don't have an account ? <span
                                class="text-primary font-weight-bold ml-2">Sign Up</span> </p>
                    </div>
                </v-container>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>

</script>