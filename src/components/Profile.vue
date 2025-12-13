<template>
    <section>
        <v-row>
            <v-col cols="12" md="6">
                <div class="">
          <v-card  rounded="xl" elevation="2" class="pa-8 mb-8 card-box-shadow">
            <div class="d-flex justify-space-between align-start">

              <!-- LEFT SIDE -->
              <div>
                <div class="d-flex">
                  <!-- Avatar -->
                  <v-avatar size="84" class="mr-6" rounded
                    style="background: linear-gradient(135deg, #F7C56A, #D9902A);">
                    <span class="text-h5 font-weight-bold white--text">{{ initials }}</span>
                  </v-avatar>

                  <div>
                    <h2 class="font-weight-bold">{{ profile.name }}</h2>
                    <p class="text-medium-emphasis mb-3">Member since {{ profile.memberSince }}</p>

                    <!-- Verified badges -->
                    <v-chip color="green-lighten-4" text-color="green-darken-2" class="mr-3">
                      Reliable
                    </v-chip>
                    <v-btn @click="$router.push('/settings')" class="text-none" rounded="lg" color="primary" elevation="0"> <v-icon class="mr-1">mdi-cog</v-icon> Setting </v-btn>

                    <v-chip v-for="v in verified" :key="v" class="mr-2" color="green-lighten-4"
                      text-color="green-darken-2" variant="outlined">
                      <v-icon size="14" class="mr-1">mdi-check</v-icon>
                      {{ v }}
                    </v-chip>
                  </div>

                </div>

              </div>

              <!-- Trust Score -->
              <v-card width="110" class="d-flex flex-column align-center py-4 text-white" rounded="lg"
                style="background: linear-gradient(135deg, #3FB57C, #1E7F4B);">
                <h2 class="font-weight-bold">{{ profile.trustScore }}</h2>
                <span class="text-caption">TRUST SCORE</span>
              </v-card>

            </div>
            <!-- Stats -->
            <v-row class="mt-10">
              <v-col>
                <v-card class="pa-6 rounded-xl" elevation="0" color="grey-lighten-4">
                  <h2 class="font-weight-bold mb-1">{{ profile.completedInteractions }}</h2>
                  <span class="text-medium-emphasis">Completed Interactions</span>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="100%" width="100%" class="pa-6 rounded-xl" elevation="0" color="grey-lighten-4">
                  <h2 class="font-weight-bold mb-1">{{ profile.usersRatedBy }}</h2>
                  <span class="text-medium-emphasis">Users Rated By</span>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

          <!-- Recent Feedback -->
          <v-card  rounded="xl" elevation="2" class="pa-8 card-box-shadow">
            <h2 class="font-weight-bold mb-6">Recent Feedback</h2>

            <div v-for="fb in feedback" :key="fb.id">
              <v-card class="pa-6 mb-6 rounded-xl" variant="outlined" elevation="0">
                <div class="d-flex justify-space-between">
                  <!-- Reviewer Info -->
                  <div class="d-flex">
                    <v-avatar size="46" class="mr-4" color="grey-lighten-3">
                      <span class="text-subtitle-2 font-weight-medium">{{ getInitials(fb.name) }}</span>
                    </v-avatar>

                    <div>
                      <h4 class="font-weight-bold mb-1">{{ fb.name }}</h4>
                      <span class="text-medium-emphasis text-body-2">{{ fb.date }}</span>

                      <!-- Tags -->
                      <div class="d-flex ga-2 mt-3">
                        <v-chip v-for="tag in fb.tags" :key="tag" size="small" variant="outlined"
                          color="grey-lighten-2">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <!-- Star Rating -->
                  <v-rating v-model="fb.rating" readonly color="amber" size="22" />
                </div>

                <!-- Feedback Text -->
                <p class="mt-4 text-body-1 ml-15">
                  {{ fb.comment }}
                </p>
              </v-card>
            </div>
            <div class="d-flex justify-center">
              <v-btn color="primary" class="text-none font-weight-bold" variant="text" size="large">View All
                Reviews</v-btn>
            </div>

          </v-card>
                 </div>
            </v-col>
            <v-col cols="12" md="6">
                <div>
          <h2 class="font-weight-bold">My Reputation</h2>
          <p class="text-subtitle-1">Track your trust profile and ratings from the community</p>
          <v-card  rounded="xl" class="pa-8 mb-2 mt-4 card-box-shadow" elevation="0">
            <div class="d-flex align-center">
              <v-icon size="32" color="green-darken-2" class="mr-4">mdi-shield-check-outline</v-icon>
              <h3 class="text-h6 font-weight-medium">Trust Score</h3>
            </div>

            <div class="mt-4">
              <span class="text-h3 font-weight-bold">86</span>
              <span class="text-h5 text-medium-emphasis">/100</span>
            </div>

            <div class="d-flex align-center mt-3">
              <v-icon size="20" color="green-darken-2" class="mr-1">mdi-trending-up</v-icon>
              <span class="text-body-2" style="color:#1F8F4B;">+3 this month</span>
            </div>
          </v-card>

          <!-- AVG RATING CARD -->
          <v-card  rounded="xl" class="pa-8 card-box-shadow" elevation="0">
            <div class="d-flex align-center">
              <v-icon size="32" color="orange-darken-2" class="mr-4">mdi-star-outline</v-icon>
              <h3 class="text-h6 font-weight-medium">Avg Rating</h3>
            </div>

            <div class="mt-4">
              <span class="text-h3 font-weight-bold">4.8</span>
              <span class="text-h5 text-medium-emphasis">/5</span>
            </div>

            <p class="text-body-2 text-medium-emphasis mt-3">
              From 45 ratings
            </p>
          </v-card>
          <v-card  rounded="xl" class="pa-8 card-box-shadow mt-4">
            <h2 class="font-weight-bold mb-6">Feedback You've Received</h2>

            <div v-for="fb in feedback" :key="fb.id">
              <v-card class="pa-6 mb-6 rounded-xl" variant="outlined" elevation="0">
                <div class="d-flex justify-space-between">
                  <!-- Reviewer Info -->
                  <div class="d-flex">
                    <v-avatar size="46" class="mr-4" color="grey-lighten-3">
                      <span class="text-subtitle-2 font-weight-medium">{{ getInitials(fb.name) }}</span>
                    </v-avatar>

                    <div>
                      <h4 class="font-weight-medium mb-1">{{ fb.name }}</h4>
                      <span class="text-medium-emphasis text-body-2">{{ fb.date }}</span>

                      <!-- Tags -->
                      <div class="d-flex ga-2 mt-3">
                        <v-chip v-for="tag in fb.tags" :key="tag" size="small" variant="outlined"
                          color="grey-lighten-2">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <!-- Star Rating -->
                  <v-rating v-model="fb.rating" readonly color="amber" size="22" />
                </div>

                <!-- Feedback Text -->
                <p class="mt-4 text-body-1">
                  {{ fb.comment }}
                </p>
              </v-card>
            </div>
            <div class="d-flex justify-center">
              <v-btn color="primary" class="text-none font-weight-bold" variant="text" size="large">View All
                Reviews</v-btn>
            </div>

          </v-card>
        </div>

            </v-col>
        </v-row>
    
    </section>
</template>
<script setup>
    const profile = ref({
  name: "Sarah Chen",
  memberSince: "2023",
  trustScore: 86,
  completedInteractions: 127,
  usersRatedBy: 45,
});
const initials = computed(() => {
  return profile.value.name
    .split(" ")
    .map((n) => n[0])
    .join("");
});

const getInitials = (n) => n.split(" ").map((v) => v[0]).join("");
const feedback = ref([
  {
    id: 1,
    name: "Alex Johnson",
    date: "2 days ago",
    tags: ["On time", "Professional", "Helpful"],
    rating: 5,
    comment:
      "Excellent communication throughout. Very knowledgeable and provided accurate information quickly.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    date: "1 week ago",
    tags: ["Responsive", "Polite"],
    rating: 5,
    comment:
      "Very polite and very responsive. Smooth interaction overall.",
  },
]);
</script>