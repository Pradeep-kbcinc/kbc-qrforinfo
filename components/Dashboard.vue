<template>
  <v-container fluid>
    <div class="mt-1 d-flex align-center">
      <div>
        <h3 class="font-weight-bold">Dashboard</h3>
        <p>Welcome Back, Abhijit Debnath</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="router.push('/add-new-property')" height="48" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
        <v-icon>mdi-plus</v-icon> Add Property
      </v-btn>
    </div>
    <section class="py-4">
      <v-row>
        <v-col>
          <v-card class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Active Listings</p>
              <h5 class="text-primary text-h4 font-weight-bold mt-1">12</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Total Views</p>
              <h5 class="text-green text-h4 font-weight-bold mt-1">1,247</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Messages</p>
              <h5 class="text-purple text-h4 font-weight-bold mt-1">28</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Drafts</p>
              <h5 class="text-lightBlack text-h4 font-weight-bold mt-1">3</h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-card class="card-box-shadow rounded-lg">
        <v-card-text>
          <v-row align="center" justify="space-between" class="px-2 mb-2">
            <h3 class="text-h6">Recent Properties</h3>
            <v-btn variant="text" color="primary" class="text-capitalize">View All</v-btn>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-list class="py-0">
            <div v-for="(property, i) in properties" :key="i">
              <v-list-item @click="$router.push('/property/' + property.id)" class="px-2 my-2 pointer">
                <template #prepend>
                  <v-avatar size="82" rounded="lg" class="mr-4 bg-grey-lighten-4 text-h4">
                    <!-- <v-img :src="property.image" cover /> -->
                    🏠
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold text-grey-darken-3">{{ property.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ property.location }}</v-list-item-subtitle>
                <div class="text-primary font-weight-bold text-subtitle-1">{{ property.price }}</div>

                <template #append>
                  <div class="text-end">

                    <v-chip :color="property.statusColor" class="mt-1" size="small" variant="flat" text-color="green-lighten-2 text-none">
                      {{ property.status }}
                    </v-chip>
                  </div>
                </template>

              </v-list-item>
              <v-divider v-for="(p, i) in properties.slice(0, -1)" :key="'divider-' + i"></v-divider>
            </div>


          </v-list>
        </v-card-text>
      </v-card>
    </section>
  </v-container>
</template>
<script setup>
const router = useRouter()
const properties = [
  {
    id: 1,
    title: 'Modern 3BR Apartment',
    location: 'New York',
    price: '$450,000',
    status: 'ACTIVE',
    statusColor: 'green-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
  {
    id: 2,
    title: 'Downtown Studio',
    location: 'Brooklyn',
    price: '$195,000',
    status: 'ACTIVE',
    statusColor: 'green-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
  {
    id: 3,
    title: 'Suburban House',
    location: 'Queens',
    price: '$650,000',
    status: 'DRAFT',
    statusColor: 'grey-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
]
</script>